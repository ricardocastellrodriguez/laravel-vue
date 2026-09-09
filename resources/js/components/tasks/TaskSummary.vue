<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useTaskStore } from '../../stores/taskStore'

const taskStore = useTaskStore()

const {
    totalTasks,
    completedTasksCount,
    pendingTasksCount,
} = storeToRefs(taskStore)
</script>

<template>
    <section>
        <h2>Resumen</h2>

        <p>
            Total: {{ totalTasks }}
        </p>

        <p>
            Completadas: {{ completedTasksCount }}
        </p>

        <p>
            Pendientes: {{ pendingTasksCount }}
        </p>
    </section>
</template>