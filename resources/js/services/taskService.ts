import http from './http'

import type { Task } from '../types/Task'

export interface CreateTaskData {
    title: string
}

export interface UpdateTaskData {
    title?: string
    completed?: boolean
}

export const taskService = {
    async getAll(): Promise<Task[]> {
        const response = await http.get<Task[]>('/api/tasks')

        return response.data
    },

    async create(data: CreateTaskData): Promise<Task> {
        const response = await http.post<Task>(
            '/api/tasks',
            data,
        )

        return response.data
    },

    async update(
        id: number,
        data: UpdateTaskData,
    ): Promise<Task> {
        const response = await http.put<Task>(
            `/api/tasks/${id}`,
            data,
        )

        return response.data
    },

    async remove(id: number): Promise<void> {
        await http.delete(`/api/tasks/${id}`)
    },
}