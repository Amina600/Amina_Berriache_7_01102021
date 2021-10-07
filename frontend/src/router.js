
import Login from './components/Login.vue'
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;