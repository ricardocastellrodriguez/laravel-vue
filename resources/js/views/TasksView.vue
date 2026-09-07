<script setup lang="ts">
import { onMounted, ref } from 'vue'

import http from '../services/http'

import type { Task } from '../types/Task'

const tasks = ref<Task[]>([])

async function loadTasks(): Promise<void> {
    const response = await http.get<Task[]>('/api/tasks')

    tasks.value = response.data
}

onMounted(() => {
    loadTasks()
})
</script>

<template>
    <section>
        <h1>Tareas</h1>

        <ul>
            <li
                v-for="task in tasks"
                :key="task.id"
            >
                {{ task.title }}
            </li>
        </ul>
    </section>
</template>