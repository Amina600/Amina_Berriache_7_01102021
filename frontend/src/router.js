import {createWebHistory, createRouter} from "vue-router"
import Login from './pages/login/Login.vue'
import Accueil from './pages/accueil/Accueil.vue'
import Profile from './pages/profile/Profile'

const routes = [
    {
        path: "/",
        component: Login,
    },
    {
        path: "/accueil",
        component: Accueil,
    },
    {
        path: "/profile",
        component: Profile,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;