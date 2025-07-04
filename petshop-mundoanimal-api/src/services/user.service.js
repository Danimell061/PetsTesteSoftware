import Pet from "../models/Pet.js";
import User from "../models/User.js";
import authService from "./auth.service.js";

const userService = {
    create: async (body) => {
        try{
            const user = await User.create({
                name: body.name,
                email: body.email,
                password: body.password,
                role: body.role ?? undefined
            })

            return authService.generateToken(user._id)
        }catch(err){
            console.log(err)
            return
        }
        
    },
    findAll: () => {
        return User.find()
    },
    findById: (id) => {
        return User.findById(id)
    },
    update: (id, name, email, password) => {
        return User.findByIdAndUpdate(id, { name, email, password })
    },
    updateRole: (id, role) => {
        return User.findByIdAndUpdate(id, { role })
    },
    delete: async (id) => {
        await Pet.deleteMany({ user: id })
        return User.findByIdAndDelete(id)
    }
}

export default userService