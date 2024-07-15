import axios from 'axios'
import VueAxios from 'vue-axios'

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'
console.log('setting base', baseURL)
const axiosInstance = axios.create({
    // baseURL: baseURL
    baseURL: baseURL,
    // proxy: false
    withCredentials: true
})

export { axiosInstance, VueAxios }
