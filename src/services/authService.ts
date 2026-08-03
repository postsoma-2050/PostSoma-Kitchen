import { ref, computed } from 'vue'
import { supabase, isSupabaseConfigured } from './supabaseClient'

export type UserRole = 'admin' | 'user' | null

export interface AuthState {
    user: any | null
    role: UserRole
    loading: boolean
    initialized: boolean
}

const state = ref<AuthState>({
    user: null,
    role: null,
    loading: false,
    initialized: false,
})

export const currentUser = computed(() => state.value.user)
export const userRole = computed(() => state.value.role)
export const isLoggedIn = computed(() => Boolean(state.value.user))
export const isAdmin = computed(() => state.value.role === 'admin')
export const isAuthInitialized = computed(() => state.value.initialized)

/**
 * 校验指定 Auth 用户在 public.profiles 中的角色
 */
async function fetchUserRole(userId: string): Promise<UserRole> {
    if (!supabase || !userId) return null
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single()

        if (error || !data) {
            console.warn('[AuthService] 读取用户 Profile 失败或不存在:', error?.message)
            return 'user'
        }

        return (data.role as UserRole) || 'user'
    } catch (e) {
        console.error('[AuthService] 无法查询用户 Role:', e)
        return 'user'
    }
}

/**
 * 初始化 Supabase Auth 会话与角色感知 (不阻塞公开页面)
 */
export async function initAuth(): Promise<void> {
    if (state.value.initialized) return
    if (!isSupabaseConfigured || !supabase) {
        state.value.initialized = true
        return
    }

    try {
        state.value.loading = true
        const { data } = await supabase.auth.getSession()
        const sessionUser = data?.session?.user || null

        if (sessionUser) {
            state.value.user = sessionUser
            state.value.role = await fetchUserRole(sessionUser.id)
        } else {
            state.value.user = null
            state.value.role = null
        }

        // 监听 Auth 变化 (登录/登出)
        supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
            const user = session?.user || null
            state.value.user = user
            if (user) {
                state.value.role = await fetchUserRole(user.id)
            } else {
                state.value.role = null
            }
        })
    } catch (e) {
        console.error('[AuthService] 初始化会话失败:', e)
    } finally {
        state.value.loading = false
        state.value.initialized = true
    }
}

/**
 * 管理员/用户登录
 */
export async function loginWithEmail(email: string, password: string): Promise<{ ok: boolean; message?: string }> {
    if (!isSupabaseConfigured || !supabase) {
        return { ok: false, message: 'Supabase 未配置，无法通过云端认证。请使用 Local 存储模式。' }
    }

    try {
        state.value.loading = true
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        })

        if (error || !data.user) {
            return { ok: false, message: error?.message || '邮箱或密码错误，请重试' }
        }

        state.value.user = data.user
        const role = await fetchUserRole(data.user.id)
        state.value.role = role

        if (role !== 'admin') {
            return { ok: false, message: '登录成功，但该账号没有 PostSoma Kitchen Studio 管理员权限。' }
        }

        return { ok: true }
    } catch (e: any) {
        return { ok: false, message: e?.message || '网络连接异常，登录失败' }
    } finally {
        state.value.loading = false
    }
}

/**
 * 退出登录
 */
export async function logout(): Promise<void> {
    if (supabase) {
        await supabase.auth.signOut()
    }
    state.value.user = null
    state.value.role = null
}
