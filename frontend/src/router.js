import {createWebHistory, createRouter} from "vue-router"
import Login from './pages/login/Login.vue'
import Accueil from './pages/accueil/Accueil.vue'

const routes = [
    {
        path: "/",
        component: Login,
    },
    {
        path: "/accueil",
        component: Accueil,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;