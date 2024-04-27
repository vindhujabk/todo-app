import axios from "axios"
const instance = axios.create({
    baseURL: "https://todo-app-ofoc.vercel.app/"
})
export default instance