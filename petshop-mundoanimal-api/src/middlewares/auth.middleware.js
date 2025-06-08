import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import userService from '../services/user.service.js'

dotenv.config()

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).send("Unauthorized")
    }

    const parts = authorization.split(" ")

    if(parts.length !== 2){
        return res.status(401).send("Unauthorized")
    }

    const [ schema, token ] = parts

    if(schema !== "Bearer") {
        return res.status(401).send("Unauthorized")
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
        if(error){
            return res.status(401).send({ message: "Token invalido!" })
        }
        req.decodedId = decoded.id

        return next()
    })
}

const roleMiddleware = async (req, res, next) => {
    try{
        const { decodedId } = req
        const user = await userService.findById(decodedId)

        if(user.role === 'cliente'){
            return res.status(401).send({ message: "Acesso negado!" })
        }
        
        return next()
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

export { authMiddleware, roleMiddleware }