import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useTaskStore } from '../stores/taskStore'

export type TaskFilter =
    | 'all'
    | 'pending'
    | 'completed'

export function useTasks() {
    const taskStore = useTaskStore()

    const {
        tasks,
        loading,
        error,
    } = storeToRefs(taskStore)

    const {
        loadTasks,
        createTask,
        toggleTask,
        deleteTask,
    } = taskStore

    const filter = ref<TaskFilter>('all')

    const filteredTasks = computed(() => {
        if (filter.value === 'completed') {
            return tasks.value.filter(
                task => Boolean(task.completed),
            )
        }

        if (filter.value === 'pending') {
            return tasks.value.filter(
                task => !Boolean(task.completed),
            )
        }

        return tasks.value
    })

    function setFilter(value: TaskFilter): void {
        filter.value = value
    }

    return {
        tasks,
        loading,
        error,

        filter,
        filteredTasks,

        loadTasks,
        createTask,
        toggleTask,
        deleteTask,

        setFilter,
    }
}