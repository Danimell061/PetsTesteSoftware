import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import dbConnect from './src/database/dbConnect.js'

import userRoutes from './src/routes/user.routes.js'
import authRoute from './src/routes/auth.route.js'



const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoute)


app.listen(port, ()=>{
    dbConnect()
    console.log('Servidor rodando na porta ' + port)
})