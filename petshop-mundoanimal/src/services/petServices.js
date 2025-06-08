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
    const response = await api.get('/pet/byUser', {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}

const cadastrarPetService = async (formData) => {
    const response = await api.post('/pet/', formData, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    });
    return response;
}

const deletePetService = async (petId, token) => {
    const response = await api.delete(`/pet/${petId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export { getAllPets, getUserPets, cadastrarPetService, deletePetService }