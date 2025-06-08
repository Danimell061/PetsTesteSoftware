import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbConnect from './database/dbConnect.js'
import cors from 'cors'

import userRoutes from './routes/user.routes.js'
import authRoute from './routes/auth.route.js'
import petRoute from './routes/pet.route.js'
import swaggerRoute from './routes/swagger.route.js'



const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoute)
app.use('/api/pet', petRoute)
app.use('/api/doc', swaggerRoute)



app.listen(port, ()=>{
    dbConnect()
    console.log('Servidor rodando na porta ' + port)
})