import http from './http'

import type { User } from '../types/User'

export interface LoginData {
    email: string
    password: string
}

export const authService = {
    async csrf(): Promise<void> {
        await http.get('/sanctum/csrf-cookie')
    },

    async login(data: LoginData): Promise<void> {
        await this.csrf()

        await http.post('/login', data)
    },

    async logout(): Promise<void> {
        await http.post('/logout')
    },

    async getUser(): Promise<User> {
        const response = await http.get<User>('/api/user')

        return response.data
    },
}