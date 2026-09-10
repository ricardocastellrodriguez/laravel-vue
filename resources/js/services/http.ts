import axios from 'axios'

const http = axios.create({
    baseURL: '/',

    headers: {
        Accept: 'application/json',
    },

    withCredentials: true,
    withXSRFToken: true,
})

export default http