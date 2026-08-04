-- PostSoma Kitchen · Harden recipe write RPC permissions
-- Anonymous clients may read published recipes through RLS, but must never call
-- the SECURITY DEFINER write function. CLI migrations use the service-role key.

revoke execute on function public.save_recipe_with_revision(jsonb, integer) from public;
revoke execute on function public.save_recipe_with_revision(jsonb, integer) from anon;

grant execute on function public.save_recipe_with_revision(jsonb, integer) to authenticated;
grant execute on function public.save_recipe_with_revision(jsonb, integer) to service_role;
