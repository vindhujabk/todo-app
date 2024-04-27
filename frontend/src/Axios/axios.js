import axios from "axios"
const instance = axios.create({
    baseURL: "https://todo-app-ofoc-oh52oiluv-vindhujas-projects.vercel.app/api"
})
export default instance