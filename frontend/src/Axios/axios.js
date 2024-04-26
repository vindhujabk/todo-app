import axios from "axios"
const instance = axios.create({
    
    baseURL:"https://todo-app-nine-beige-94.vercel.app/"
})
export default instance