<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useAuthStore } from './stores/authStore'

const router = useRouter()

const authStore = useAuthStore()

const {
    user,
    isAuthenticated,
} = storeToRefs(authStore)

async function handleLogout(): Promise<void> {
    await authStore.logout()

    await router.push('/login')
}
</script>

<template>
    <div>
        <nav>
            <RouterLink to="/">
                Inicio
            </RouterLink>

            |

            <RouterLink
                v-if="isAuthenticated"
                to="/tareas"
            >
                Tareas
            </RouterLink>

            <RouterLink
                v-if="!isAuthenticated"
                to="/login"
            >
                Iniciar sesión
            </RouterLink>

            <template v-if="user">
                |

                {{ user.name }}

                |

                <button
                    type="button"
                    @click="handleLogout"
                >
                    Cerrar sesión
                </button>
            </template>
        </nav>

        <hr>

        <RouterView />
    </div>
</template>