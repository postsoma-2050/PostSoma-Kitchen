import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { autoRefreshEnvSettings } from './utils/envWatcher'
import './style.css'

// 路由级懒加载：首页、详情、冰箱与 Admin Studio 按访问场景独立下载。
const PublishHome = () => import('./views/PublishHome.vue')
const RecipeDetailV3 = () => import('./views/RecipeDetailV3.vue')
const FridgeMatch = () => import('./views/FridgeMatch.vue')
const About = () => import('./views/About.vue')
const AdminLogin = () => import('./views/AdminLogin.vue')
const MyRecipes = () => import('./views/MyRecipes.vue')
const RecipeEditorV3 = () => import('./views/RecipeEditorV3.vue')

const routes = [
    // 1. 公开视角 (Publish 视图 - 必须保证 100% 匿名可用)
    { path: '/', component: PublishHome },                       // 公开食谱库首页
    { path: '/recipe/:id', component: RecipeDetailV3 },        // 食谱详情 (公开只读)
    { path: '/fridge', component: FridgeMatch },               // 清冰箱食材匹配
    { path: '/about', component: About },                     // 关于与 E-E-A-T 权威页面

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
    const hasSupabaseConfig = Boolean(
        import.meta.env.VITE_SUPABASE_URL
        && import.meta.env.VITE_SUPABASE_ANON_KEY
        && import.meta.env.VITE_SUPABASE_URL.startsWith('http')
    )

    // 如果未要求 Admin 权限，或者是纯 Local 模式 / Supabase 未配置，直接放行
    if (!to.meta.requiresAdmin || storageMode === 'local' || !hasSupabaseConfig) {
        return next()
    }

    // 仅进入需要鉴权的 Studio 路由时加载 Supabase Auth。
    const { initAuth, isLoggedIn, isAdmin } = await import('./services/authService')
    await initAuth()

    if (isLoggedIn.value && isAdmin.value) {
        return next()
    }

    // 未授权，自动携带原始 redirect 参数重定向至登录页
    next(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
})

// Google Analytics (GA4) 单页路由切换 Pageview 自动追踪
router.afterEach((to) => {
    if (typeof (window as any).gtag === 'function') {
        ;(window as any).gtag('config', 'G-3JFCN7B1ZR', {
            page_path: to.fullPath
        })
    }
})

const app = createApp(App).use(router)

autoRefreshEnvSettings()

app.mount('#app')
