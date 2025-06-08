import userService from '../services/user.service.js'

// Cria usuario
const registerUser = async (req, res)=>{
    try{
        const { name, email, password, role } = req.body

        if(!name || !email || !password){
            return res.status(400).send({ message: "Todos campos requiridos!" })
        }

        // Se tiver cargo da console log no cargo
        console.log(`Cargo: ${role ?? 'cliente'}`)

        const token = await userService.create(req.body) // Chama o userService para se comunicar com o database

        if(!token){
            return res.status(400).send({ message: "Erro criando o usuario (provavelmente ja existe esse email)" })
        }

        res.status(201).send(token)
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

// Encontrar todos usuarios
const findAllUsers = async (req, res)=>{
    try{
        const users = await userService.findAll()
        if(users.length <= 0){
            return res.send(400).send({ message: "Não há usuarios registrados!" })
        }
        res.status(200).send(users)
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

// Encontra usuario pelo id
const findUser = async (req, res)=>{
    try{
        const { user } = req
        res.status(200).send(user)
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

// Atualiza um usuario pelo id
const updateUser = async (req, res) => {
    try{
        
        const { userId: id, decodedId } = req

        if(id != decodedId){
            const user = await userService.findById(decodedId)
            if(user.role !== 'admin' && user.role !== 'funcionario'){
                return res.status(401).send("Unauthorized")
            }
        }

        const { name, email, password, role } = req.body

        if(!name && !email && !password && !role){
            return res.status(400).send({ message: "Preencha pelo menos um campo!" })
        }

        await userService.update(
            id,
            name,
            email,
            password
        )

        res.send({ message: "Usuario atualizado com sucesso!" })
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

export { registerUser, findAllUsers, findUser, updateUser }