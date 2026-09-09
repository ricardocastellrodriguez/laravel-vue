<script setup lang="ts">
import { onMounted, ref } from 'vue'

import TaskSummary from '../components/tasks/TaskSummary.vue'

import { useTasks } from '../composables/useTasks'

const title = ref('')

const {
    filteredTasks,
    loading,
    error,

    loadTasks,
    createTask,
    toggleTask,
    deleteTask,

    setFilter,
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

        <TaskSummary />

        <hr>

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

        <div>
            <button
                type="button"
                @click="setFilter('all')"
            >
                Todas
            </button>

            <button
                type="button"
                @click="setFilter('pending')"
            >
                Pendientes
            </button>

            <button
                type="button"
                @click="setFilter('completed')"
            >
                Completadas
            </button>
        </div>

        <p v-if="loading">
            Procesando...
        </p>

        <p v-if="error">
            {{ error }}
        </p>

        <ul>
            <li
                v-for="task in filteredTasks"
                :key="task.id"
            >
                <input
                    type="checkbox"
                    :checked="Boolean(task.completed)"
                    :disabled="loading"
                    @change="toggleTask(task)"
                >

                <span>
                    {{ task.title }}
                </span>

                <button
                    type="button"
                    :disabled="loading"
                    @click="deleteTask(task)"
                >
                    Eliminar
                </button>
            </li>
        </ul>
    </section>
</template>