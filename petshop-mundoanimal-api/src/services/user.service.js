import User from "../models/User.js";

const userService = {
    create: (body) => {
        return User.create({
            name: body.name,
            email: body.email,
            password: body.password,
            role: body.role ?? undefined
        })
    },
    findAll: () => {
        return User.find()
    },
    findById: (id) => {
        return User.findById(id)
    },
    update: (id, name, email, password) => {
        return User.findByIdAndUpdate(id, { name, email, password })
    }
}

export default userService