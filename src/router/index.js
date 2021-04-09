import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login"
import Home from "../components/Home";
import User from "../components/admin/User";
import Welcome from "../components/Welcome";
import {use} from "element-ui/src/locale";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/home",
        component: Home,
        redirect: "/welcome",
        children:[
            {path:"/welcome",component:Welcome},
            {path:"/user",component:User}
        ]
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问
    // from 从哪访问
    // next 接着做
    if (to.path == '/login') return next()
    const user = window.sessionStorage.getItem("user")
    if (user == null) return next("/login")
    else next()
})

export default router
