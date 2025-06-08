import api from "./api.js";

function getAllUsers(token){
    const response = api.get('/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

function loginService(data){
    const response = api.post('/auth/login', data)
    return response
}

function cadastrarService(data){
    const response = api.post('/user/', data)
    return response
}

function atualizarUsuario(data, token){
    
}

export { getAllUsers, loginService, cadastrarService }