import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

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
export { authMiddleware }