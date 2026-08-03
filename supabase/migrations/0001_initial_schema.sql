-- ============================================================================
-- PostSoma Kitchen · Supabase Staging Initial Schema & RLS Policies
-- Migration: 0001_initial_schema.sql
-- Description: 建立 profiles, recipes, recipe_revisions 表, is_admin() 安全函数, 
--              带乐观锁的原子 RPC (save_recipe_with_revision) 及 RLS 策略
-- ============================================================================

-- 1. 开启必要扩展
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- 2. 创建用户 Profile 扩展表 (与 auth.users 绑定)
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    role text not null default 'user' check (role in ('admin', 'user')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 3. 创建食谱主表 (recipes)
create table if not exists public.recipes (
    id text primary key,
    slug text unique not null,
    schema_version text not null default '3.0',
    status text not null check (status in ('draft', 'published', 'archived')),
    visibility text not null default 'public' check (visibility in ('public', 'private')),
    is_official boolean not null default false,
    
    title text not null,
    description text,
    cover_image_url text,
    cuisine text not null default 'chinese',
    cooking_method text not null default 'other',
    difficulty text not null default 'easy',
    servings text,
    estimated_minutes integer,
    
    completeness_score smallint not null default 0 check (completeness_score between 0 and 100),
    validation_snapshot jsonb not null default '{}'::jsonb,
    content jsonb not null default '{}'::jsonb,
    
    author_id uuid references public.profiles(id) on delete set null,
    content_version integer not null default 1,
    
    deleted_at timestamptz default null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    published_at timestamptz default null
);

-- 4. 创建食谱历史快照审计表 (recipe_revisions)
create table if not exists public.recipe_revisions (
    id uuid primary key default uuid_generate_v4(),
    recipe_id text not null references public.recipes(id) on delete cascade,
    revision_number integer not null,
    status text not null,
    completeness_score smallint not null default 0,
    content_snapshot jsonb not null,
    validation_snapshot jsonb not null default '{}'::jsonb,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now()
);

-- 5. 通用 updated_at 自动更新 Trigger 函数
create or replace function public.update_updated_at_column()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
    before update on public.profiles
    for each row execute function public.update_updated_at_column();

drop trigger if exists set_recipes_updated_at on public.recipes;
create trigger set_recipes_updated_at
    before update on public.recipes
    for each row execute function public.update_updated_at_column();

-- 6. 安全判定函数 is_admin() (使用 SECURITY DEFINER 防提权)
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
    select exists (
        select 1 from public.profiles
        where id = auth.uid() and role = 'admin'
    );
$$;

-- 7. 自动将 Supabase Auth 注册新用户注入 profiles 表
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
    insert into public.profiles (id, email, role)
    values (new.id, new.email, 'user')
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- 8. 索引设计
create index if not exists idx_recipes_status_visibility on public.recipes(status, visibility) where deleted_at is null;
create index if not exists idx_recipes_author on public.recipes(author_id);
create index if not exists idx_recipes_cuisine_method on public.recipes(cuisine, cooking_method);
create index if not exists idx_recipes_title_trgm on public.recipes using gin (title gin_trgm_ops);
create index if not exists idx_revisions_recipe_id on public.recipe_revisions(recipe_id, revision_number desc);

-- ============================================================================
-- 9. Row Level Security (RLS) 策略设计 (幂等重建)
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_revisions enable row level security;

-- Profiles RLS
drop policy if exists "Profiles are viewable by authenticated users" on public.profiles;
create policy "Profiles are viewable by authenticated users"
    on public.profiles for select
    to authenticated using (true);

drop policy if exists "Users or Admins can update profiles" on public.profiles;
create policy "Users or Admins can update profiles"
    on public.profiles for update
    to authenticated using (auth.uid() = id or public.is_admin());

-- Recipes RLS
drop policy if exists "Anon view published public recipes" on public.recipes;
create policy "Anon view published public recipes"
    on public.recipes for select
    to anon, authenticated
    using (
        deleted_at is null 
        and status = 'published' 
        and visibility = 'public'
    );

drop policy if exists "Admins full access on recipes" on public.recipes;
create policy "Admins full access on recipes"
    on public.recipes for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Recipe Revisions RLS
drop policy if exists "Admins access recipe revisions" on public.recipe_revisions;
create policy "Admins access recipe revisions"
    on public.recipe_revisions for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- ============================================================================
-- 10. 带乐观锁 (content_version) 与快照落盘的原子保存 RPC
-- ============================================================================

create or replace function public.save_recipe_with_revision(
    p_recipe jsonb,
    p_expected_version integer default null
)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
    v_id text;
    v_title text;
    v_status text;
    v_visibility text;
    v_is_official boolean;
    v_cuisine text;
    v_method text;
    v_difficulty text;
    v_score integer;
    v_curr_version integer;
    v_new_version integer;
    v_new_rev_num integer;
    v_user_id uuid;
    v_existing_rec record;
    v_result jsonb;
begin
    -- 1. 校验操作员权限 (允许管理员与 CLI 种子脚本写入)
    v_user_id := auth.uid();
    if not (public.is_admin() or auth.uid() is null) then
        raise exception 'PERMISSION_DENIED: 只有 PostSoma Kitchen Studio 管理员允许保存或修改食谱';
    end if;

    -- 2. 解析 JSONB 入参
    v_id := p_recipe->>'id';
    v_title := coalesce(p_recipe->>'title', '未命名食谱');
    v_status := coalesce(p_recipe->>'status', 'draft');
    v_visibility := coalesce(p_recipe->>'visibility', 'public');
    v_is_official := coalesce((p_recipe->>'is_official')::boolean, false);
    v_cuisine := coalesce(p_recipe->>'cuisine', 'chinese');
    v_method := coalesce(p_recipe->'finalBlock'->>'method', 'other');
    v_difficulty := coalesce(p_recipe->>'difficulty', 'easy');
    v_score := coalesce((p_recipe->>'completeness_score')::integer, 0);

    if v_id is null or trim(v_id) = '' then
        raise exception 'INVALID_ID: 食谱必须包含有效的 ID';
    end if;

    -- 3. 检查现有记录与乐观锁
    select * into v_existing_rec from public.recipes where id = v_id;

    if found then
        v_curr_version := v_existing_rec.content_version;
        -- 乐观锁校验：如果传入了 expected_version 且与当前版本不符合，阻断覆盖
        if p_expected_version is not null and p_expected_version <> v_curr_version then
            raise exception 'OPTIMISTIC_LOCK_CONFLICT: 食谱在别处被更新 (当前版本 v%, 期望 v%)，请刷新后再试', v_curr_version, p_expected_version;
        end if;
        v_new_version := v_curr_version + 1;
    else
        v_curr_version := 0;
        v_new_version := 1;
    end if;

    -- 4. Upsert 到 recipes 表
    insert into public.recipes (
        id,
        slug,
        schema_version,
        status,
        visibility,
        is_official,
        title,
        description,
        cover_image_url,
        cuisine,
        cooking_method,
        difficulty,
        completeness_score,
        validation_snapshot,
        content,
        author_id,
        content_version,
        updated_at,
        published_at
    ) values (
        v_id,
        coalesce(p_recipe->>'slug', lower(regexp_replace(v_id, '[^a-zA-Z0-9_-]+', '-', 'g'))),
        coalesce(p_recipe->>'version', '3.0'),
        v_status,
        v_visibility,
        v_is_official,
        v_title,
        p_recipe->>'description',
        p_recipe->>'coverImageUrl',
        v_cuisine,
        v_method,
        v_difficulty,
        v_score,
        coalesce(p_recipe->'validation_snapshot', '{}'::jsonb),
        p_recipe,
        v_user_id,
        v_new_version,
        now(),
        case when v_status = 'published' then coalesce(v_existing_rec.published_at, now()) else v_existing_rec.published_at end
    )
    on conflict (id) do update set
        title = excluded.title,
        description = excluded.description,
        cover_image_url = excluded.cover_image_url,
        status = excluded.status,
        visibility = excluded.visibility,
        is_official = excluded.is_official,
        cuisine = excluded.cuisine,
        cooking_method = excluded.cooking_method,
        difficulty = excluded.difficulty,
        completeness_score = excluded.completeness_score,
        validation_snapshot = excluded.validation_snapshot,
        content = excluded.content,
        content_version = excluded.content_version,
        updated_at = now(),
        published_at = case when excluded.status = 'published' then coalesce(recipes.published_at, now()) else recipes.published_at end;

    -- 5. 计算 Revision 序号并自动插入快照历史
    select coalesce(max(revision_number), 0) + 1 into v_new_rev_num
    from public.recipe_revisions where recipe_id = v_id;

    insert into public.recipe_revisions (
        recipe_id,
        revision_number,
        status,
        completeness_score,
        content_snapshot,
        validation_snapshot,
        created_by,
        created_at
    ) values (
        v_id,
        v_new_rev_num,
        v_status,
        v_score,
        p_recipe,
        coalesce(p_recipe->'validation_snapshot', '{}'::jsonb),
        v_user_id,
        now()
    );

    -- 6. 返回成功结果
    select jsonb_build_object(
        'success', true,
        'id', v_id,
        'content_version', v_new_version,
        'revision_number', v_new_rev_num,
        'status', v_status
    ) into v_result;

    return v_result;
end;
$$;
