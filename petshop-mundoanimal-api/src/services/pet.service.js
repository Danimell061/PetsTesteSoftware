import Pet from "../models/Pet.js";

const petService = {
    create: (body) => {
        return Pet.create({
            name: body.name,
            type: body.type,
            age: body.age,
            breed: body.breed ?? undefined,
            photo: body.photo,
            userId: body.userId,
        })
    },
    findAll: () => {
        return Pet.find()
    }
}

export default petService