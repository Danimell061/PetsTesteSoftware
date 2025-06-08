import mongoose from "mongoose";
import userService from "../services/user.service.js";

const validId = (req, res, next) => {
    const id = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message: "ID invalido!" })
    }

    next()
}

const validUser = async (req, res, next) => {
    const id = req.params.id
    const user = await userService.findById(id)

    if(!user){
        return res.status(404).send({ message: "Usuario não encontrado!" })
    }

    req.userId = id
    req.user = user

    next()
}

export { validId, validUser }