import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './src/database/dbConnect.js'
import userRoutes from './src/routes/user.routes.js'
dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)


app.listen(process.env.PORT, ()=>{
    dbConnect()
    console.log('Servidor rodando na porta ' + process.env.PORT)
})