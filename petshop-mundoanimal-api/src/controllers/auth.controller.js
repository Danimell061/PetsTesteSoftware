import bcrypt from 'bcrypt'
import authService from '../services/auth.service.js'

const login = async (req, res) => {
    try{
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

        res.send('Login OK!')
    }catch(err){
        res.status(500).send({ message: err.message })
    }
}

export { login }