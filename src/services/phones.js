import axios from "axios";
const url = 'http://localhost:3001/persons'

const getAll = async() => {
    const request = await axios.get(url)
    return request.data
}

const addPerson = async(newPerson) => {
    const request = await axios.post(url,newPerson)
    return request.data
}

const deletePerson = async(id) => {
    const request = await axios.delete(url + `/${id}`)
    return request
}

const updatePerson = async (id, newPerson) => {
    const request = await axios.put(url + `/${id}`, newPerson)
    return request.data
}

export default { getAll, addPerson, deletePerson, updatePerson }