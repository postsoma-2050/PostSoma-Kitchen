import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { autoRefreshEnvSettings } from './utils/envWatcher'
import './style.css'

import RecipeEditorV3 from './views/RecipeEditorV3.vue'
import MyRecipes from './views/MyRecipes.vue'
import RecipeDetailV3 from './views/RecipeDetailV3.vue'
import FridgeMatch from './views/FridgeMatch.vue'
import PublishHome from './views/PublishHome.vue'
import AdminLogin from './views/AdminLogin.vue'

import { isSupabaseConfigured } from './services/supabaseClient'
import { initAuth, isLoggedIn, isAdmin } from './services/authService'

const routes = [
    // 1. 公开视角 (Publish 视图 - 必须保证 100% 匿名可用)
    { path: '/', component: PublishHome },                       // 公开食谱库首页
    { path: '/recipe/:id', component: RecipeDetailV3 },        // 食谱详情 (公开只读)
    { path: '/fridge', component: FridgeMatch },               // 清冰箱食材匹配

    // 2. 认证登录视图
    { path: '/admin/login', component: AdminLogin },

    // 3. 管理视角 (Kitchen Studio 视图 - 受路由守卫保护)
    { path: '/admin', component: MyRecipes, meta: { requiresAdmin: true } },
    { path: '/admin/create', component: RecipeEditorV3, meta: { requiresAdmin: true } },
    { path: '/admin/edit/:id', component: RecipeEditorV3, meta: { requiresAdmin: true } },

    // 4. 旧路由向后兼容重定向
    { path: '/my-recipes', redirect: '/admin' },
    { path: '/create', redirect: '/admin/create' },
    { path: '/edit/:id', redirect: (to: any) => `/admin/edit/${to.params.id}` }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Kitchen Studio 路由导航守卫
router.beforeEach(async (to, _from, next) => {
    const storageMode = import.meta.env.VITE_STORAGE_MODE || 'local'

    // 如果未要求 Admin 权限，或者是纯 Local 模式 / Supabase 未配置，直接放行
    if (!to.meta.requiresAdmin || storageMode === 'local' || !isSupabaseConfigured) {
        return next()
    }

    // 初始化 Auth 状态 (异步但不阻塞页面加载)
    await initAuth()

    if (isLoggedIn.value && isAdmin.value) {
        return next()
    }

    // 未授权，自动携带原始 redirect 参数重定向至登录页
    next(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
})

const app = createApp(App).use(router)

autoRefreshEnvSettings()

app.mount('#app')
