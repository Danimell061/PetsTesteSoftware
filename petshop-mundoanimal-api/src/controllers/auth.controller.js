import bcrypt from 'bcrypt'
import authService from '../services/auth.service.js'

const login = async (req, res) => {
    try{
        if(!req.body){
            return res.status(400).send({ message: "Todos campos são obrigatorios!" })
        }
        
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).send({ message: "Todos campos são obrigatorios!" })
        }

        const user = await authService.login(email)

        if(!user){
            return res.status(404).send({ message: "Usuario ou senha invalidos" })
        }

        const passwordIsValid = await bcrypt.compare(password, user.password)

        if(!passwordIsValid){
            return res.status(404).send({ message: "Usuario ou senha invalidos" })
        }   

        const token = authService.generateToken(user.id)

        res.send({ token: token })
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

export { login }