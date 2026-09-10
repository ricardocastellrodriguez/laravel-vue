import {
    createRouter,
    createWebHistory,
} from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TasksView from '../views/TasksView.vue'
import LoginView from '../views/LoginView.vue'

import { useAuthStore } from '../stores/authStore'

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },

        {
            path: '/tareas',
            name: 'tasks',
            component: TasksView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
    ],
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore()

    if (!authStore.initialized) {
        await authStore.fetchUser()
    }

    if (
        to.meta.requiresAuth &&
        !authStore.isAuthenticated
    ) {
        return {
            name: 'login',
        }
    }

    if (
        to.name === 'login' &&
        authStore.isAuthenticated
    ) {
        return {
            name: 'tasks',
        }
    }
})

export default router