import {createWebHistory, createRouter} from "vue-router"
import Login from './components/login/Login.vue'
import Accueil from './components/accueil/Accueil.vue'

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