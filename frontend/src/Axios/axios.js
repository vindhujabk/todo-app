import axios from "axios"
const instance = axios.create({
    // baseURL:"http://localhost:8000/api"
    baseURL:"https://todo-app-nine-beige-94.vercel.app/api"
})
export default instance