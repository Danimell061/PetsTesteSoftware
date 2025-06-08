import petService from "../services/pet.service.js"
import userService from "../services/user.service.js"

const registerPet = async (req, res) => {
    try{
        const { name, type, age, breed, photo } = req.body 

        if(!name || !type || !age){
            return res.status(400).send({ message: "Informe o nome/tipo/idade do pet!" })
        }

        const pet = await petService.create({
            name,
            type,
            age,
            breed,
            photo,
            user: req.decodedId
        })

        res.status(201).send(pet)
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

const findAllPets = async (req, res) => {
    const pets = await petService.findAll()

    if(pets.length === 0){
        return res.status(400).send({ message: "Não há pets registrados" })
    }

    res.send(pets)
}

const findPet = async (req, res) => {
    try{
        const { pet, decodedId } = req
        const { _id: id } = pet.user

        if(id != decodedId){
            const user = await userService.findById(decodedId)
            if(user.role !== 'admin' && user.role !== 'funcionario'){
                return res.status(401).send("Unauthorized")
            }
        }

        res.status(200).send(pet)
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

const findUserPets = async (req, res) => {
    try{
        const { decodedId: id } = req
        const pets = await petService.findByUser(id)

        res.status(200).send(pets)
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

const updatePet = async (req, res) => {
    try{
        const { name, type, age, breed, photo } = req.body
        const { pet, decodedId, petId } = req
        const { _id: id } = pet.user

        if(id != decodedId){
            const user = await userService.findById(decodedId)
            if(user.role !== 'admin' && user.role !== 'funcionario'){
                return res.status(401).send("Unauthorized")
            }
        }

        if(!name && !type && !age && !breed && !photo){
            return res.status(400).send({ message: "Preencha pelo menos um campo!" })
        }

        const petUpdated = await petService.update(
            petId,
            name,
            type,
            age,
            breed,
            photo
        )
        
        res.send({ message: "Pet atualizado com sucesso!" })
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

const deletePet = async (req,res) => {
    try{
        const { pet, decodedId } = req
        const { _id: userId } = pet.user
        const { id } = req.params

        if(userId != decodedId){
            const user = await userService.findById(decodedId)
            if(user.role !== 'admin' && user.role !== 'funcionario'){
                return res.status(401).send("Unauthorized")
            }
        }

        const result = await petService.delete(id)

        return res.status(200).send({ message: "Pet deletado!" })
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

export { registerPet, findAllPets, findPet, findUserPets, updatePet, deletePet }