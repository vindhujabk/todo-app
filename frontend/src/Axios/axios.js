import axios from "axios"
const instance = axios.create({
    baseURL:"https://todo-app-ofoc-oh52oiluv-vindhujas-projects.vercel.app"
})
export default instance