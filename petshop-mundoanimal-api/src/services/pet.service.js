import Pet from "../models/Pet.js";

const petService = {
    create: (body) => {
        return Pet.create({
            name: body.name,
            type: body.type,
            age: body.age,
            breed: body.breed ?? undefined,
            photo: body.photo,
            user: body.user,
        })
    },
    findAll: () => {
        return Pet.find().populate('user', 'name email')
    },
    findById: (id) => {
        return Pet.findById(id).sort({ _id: -1 }).populate('user', 'name email')
    },
    findByUser: (userId) => {
        return Pet.find({ user: userId }).sort({ _id: -1 }).populate('user', 'name email')
    },
    update: (id, name, type, age, breed, photo) => {
        return Pet.findByIdAndUpdate(id, { name, type, age, breed, photo })
    }
}

export default petService