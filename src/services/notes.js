import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

//Obteniendo las notas
const getAll = async () => {
    const request = await axios.get(API_URL + '/notes')
    return request.data
}

//Creando notas
const create = async (newNote) => {
    const request = await axios.post(API_URL + '/addNota', newNote)
    return request.data
}

//Actualizando una nota
const update = async (id) => {
    const request = await axios.put(API_URL + `/note/${id}`)
    return request
}

//Elimanando un usuario
const deleteNota = async(id) => {
    const request = await axios.delete(API_URL + `/note/${id}`)
    return request
}

export default { getAll, create, update, deleteNota }