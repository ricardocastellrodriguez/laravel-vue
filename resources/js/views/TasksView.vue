<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useTasks } from '../composables/useTasks'

const title = ref('')

const {
    tasks,
    loading,
    error,

    loadTasks,
    createTask,
    toggleTask,
    deleteTask,
} = useTasks()

async function handleCreateTask(): Promise<void> {
    const cleanTitle = title.value.trim()

    if (!cleanTitle) {
        return
    }

    const task = await createTask(cleanTitle)

    if (task) {
        title.value = ''
    }
}

onMounted(() => {
    loadTasks()
})
</script>

<template>
    <section>
        <h1>Tareas</h1>

        <form @submit.prevent="handleCreateTask">
            <input
                v-model="title"
                type="text"
                placeholder="Nueva tarea"
            >

            <button
                type="submit"
                :disabled="loading"
            >
                Crear
            </button>
        </form>

        <p v-if="loading">
            Cargando...
        </p>

        <p v-if="error">
            {{ error }}
        </p>

        <ul>
            <li
                v-for="task in tasks"
                :key="task.id"
            >
                <input
                    type="checkbox"
                    :checked="task.completed"
                    @change="toggleTask(task)"
                >

                <span>
                    {{ task.title }}
                </span>

                <button
                    type="button"
                    @click="deleteTask(task)"
                >
                    Eliminar
                </button>
            </li>
        </ul>
    </section>
</template>