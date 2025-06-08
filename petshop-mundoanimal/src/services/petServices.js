import api from "./api.js";
import Cookies from 'js-cookie'

function getAllPets(){
    const response = api.get('/pet', {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}

function getUserPets(){
    const response = api.post('/pet/byUser', {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}

function getPet(id){
    const response = api.get('/get/', {
        params: {
            id: id
        }
    })
}

function cadastrarService(data){
    const response = api.post('/user/', data)
    return response
}

function atualizarUsuario(data, token){
    
}

export { getAllUsers, loginService, cadastrarService }