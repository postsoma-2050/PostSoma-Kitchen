import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'))

if (!isSupabaseConfigured) {
    console.warn('[PostSoma Kitchen] Supabase 环境变量未配置或不完整。将使用本地 LocalStorage 存储。')
}

// 单例 Supabase Client (配置缺失时为 null)
export const supabase: SupabaseClient | null = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true,
          },
      })
    : null
