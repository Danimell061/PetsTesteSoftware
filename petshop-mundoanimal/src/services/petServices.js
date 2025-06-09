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

const updatePet = async (id, data) => {
    const response = await api.put(`/pet/${id}`, data, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}

const deletePet = async (id) => {
    const response = await api.delete(`/pet/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}

export { getAllPets, getUserPets, cadastrarPetService, deletePet, updatePet }
