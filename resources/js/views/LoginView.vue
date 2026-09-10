<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '../stores/authStore'

const router = useRouter()

const authStore = useAuthStore()

const {
    loading,
    error,
} = storeToRefs(authStore)

const email = ref('')
const password = ref('')

async function handleLogin(): Promise<void> {
    const success = await authStore.login({
        email: email.value,
        password: password.value,
    })

    if (success) {
        await router.push('/tareas')
    }
}
</script>

<template>
    <section>
        <h1>Iniciar sesión</h1>

        <form @submit.prevent="handleLogin">
            <div>
                <label for="email">
                    Correo
                </label>

                <input
                    id="email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                >
            </div>

            <div>
                <label for="password">
                    Contraseña
                </label>

                <input
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                >
            </div>

            <button
                type="submit"
                :disabled="loading"
            >
                Iniciar sesión
            </button>
        </form>

        <p v-if="error">
            {{ error }}
        </p>
    </section>
</template>