import petService from "../services/pet.service.js"

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
            userId: req.decodedId
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

export { registerPet, findAllPets }