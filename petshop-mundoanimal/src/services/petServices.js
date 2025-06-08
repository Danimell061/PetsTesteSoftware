import api from "./api.js";
import Cookies from 'js-cookie'

const getAllPets = async () => {
    const response = await api.get('/pet', {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}

const getUserPets = async () => {
    const response = await api.post('/pet/byUser', {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}

const cadastrarPetService = async (data) => {
    const response = await api.post('/pet/', {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }, data
    })
    return response
}



export { getAllPets, getUserPets, cadastrarPetService }