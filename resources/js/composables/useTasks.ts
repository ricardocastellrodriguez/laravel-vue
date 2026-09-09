import { ref } from 'vue'

import { taskService } from '../services/taskService'

import type { Task } from '../types/Task'

export function useTasks() {
    const tasks = ref<Task[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function loadTasks(): Promise<void> {
        loading.value = true
        error.value = null

        try {
            tasks.value = await taskService.getAll()
        } catch (exception) {
            error.value = getErrorMessage(exception)
        } finally {
            loading.value = false
        }
    }

    async function createTask(
        title: string,
    ): Promise<Task | null> {
        error.value = null

        try {
            const task = await taskService.create({
                title,
            })

            tasks.value.unshift(task)

            return task
        } catch (exception) {
            error.value = getErrorMessage(exception)

            return null
        }
    }

    async function toggleTask(
        task: Task,
    ): Promise<void> {
        error.value = null

        try {
            const updatedTask = await taskService.update(
                task.id,
                {
                    completed: !task.completed,
                },
            )

            Object.assign(task, updatedTask)
        } catch (exception) {
            error.value = getErrorMessage(exception)
        }
    }

    async function deleteTask(
        task: Task,
    ): Promise<void> {
        error.value = null

        try {
            await taskService.remove(task.id)

            tasks.value = tasks.value.filter(
                item => item.id !== task.id,
            )
        } catch (exception) {
            error.value = getErrorMessage(exception)
        }
    }

    function getErrorMessage(exception: unknown): string {
        if (exception instanceof Error) {
            return exception.message
        }

        return 'Ocurrió un error inesperado.'
    }

    return {
        tasks,
        loading,
        error,

        loadTasks,
        createTask,
        toggleTask,
        deleteTask,
    }
}