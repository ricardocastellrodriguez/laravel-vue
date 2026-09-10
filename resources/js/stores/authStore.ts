import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { authService } from '../services/authService'

import type { User } from '../types/User'
import type { LoginData } from '../services/authService'

import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const loading = ref(false)
    const initialized = ref(false)

    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => {
        return user.value !== null
    })

    async function fetchUser(): Promise<void> {
        loading.value = true
        error.value = null

        try {
            user.value = await authService.getUser()
        } catch {
            user.value = null
        } finally {
            loading.value = false
            initialized.value = true
        }
    }

    async function login(
        credentials: LoginData,
    ): Promise<boolean> {
        loading.value = true
        error.value = null

        try {
            await authService.login(credentials)

            user.value = await authService.getUser()

            return true
        } catch (exception) {
            user.value = null

            if (axios.isAxiosError(exception)) {
                const message =
                    exception.response?.data?.errors?.email?.[0]

                error.value =
                    message ??
                    'No fue posible iniciar sesión.'
            } else {
                error.value =
                    'Ocurrió un error inesperado.'
            }

            return false
        } finally {
            loading.value = false
            initialized.value = true
        }
    }

    async function logout(): Promise<void> {
        loading.value = true

        try {
            await authService.logout()
        } finally {
            user.value = null
            loading.value = false
            initialized.value = true
        }
    }

    return {
        user,
        loading,
        initialized,
        error,

        isAuthenticated,

        fetchUser,
        login,
        logout,
    }
})