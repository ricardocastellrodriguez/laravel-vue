<script setup lang="ts">
import { onMounted, ref } from 'vue'

import http from '../services/http'

import type { Task } from '../types/Task'

const tasks = ref<Task[]>([])

const title = ref('')

async function loadTasks(): Promise<void> {
    const response = await http.get<Task[]>('/api/tasks')

    tasks.value = response.data
}

async function createTask(): Promise<void> {
    if (!title.value.trim()) {
        return
    }

    const response = await http.post<Task>('/api/tasks', {
        title: title.value,
    })

    tasks.value.unshift(response.data)

    title.value = ''
}

async function toggleTask(task: Task): Promise<void> {
    const response = await http.put<Task>(
        `/api/tasks/${task.id}`,
        {
            completed: !task.completed,
        },
    )

    Object.assign(task, response.data)
}

async function deleteTask(task: Task): Promise<void> {
    await http.delete(`/api/tasks/${task.id}`)

    tasks.value = tasks.value.filter(
        item => item.id !== task.id,
    )
}

onMounted(() => {
    loadTasks()
})
</script>

<template>
    <section>
        <h1>Tareas</h1>

        <form @submit.prevent="createTask">
            <input
                v-model="title"
                type="text"
                placeholder="Nueva tarea"
            >

            <button type="submit">
                Crear
            </button>
        </form>

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