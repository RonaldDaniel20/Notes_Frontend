import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const login = async (data) => {
    const request = await axios.post(API_URL + '/login', data)
    return request.data
}

export default {login}