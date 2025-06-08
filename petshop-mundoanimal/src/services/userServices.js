import api from "./api.js";
import Cookies from "js-cookie";

const getAllUsers = async (token)=>{
    const response = await api.get('/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

const loginService = async (data) => {
    const response = await api.post('/auth/login', data)
    return response
}

const cadastrarService = async (data) => {
    const response = await api.post('/user/', data)
    return response
}

const getUserLogged = async () => {
    const response = await api.get('/user/findUserByTkn', {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
    return response
}


export { getAllUsers, loginService, cadastrarService, getUserLogged }