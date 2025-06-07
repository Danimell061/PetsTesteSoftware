import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './src/database/dbConnect.js'
dotenv.config()
const app = express()


app.listen(process.env.PORT, ()=>{
    dbConnect()
    console.log('Servidor rodando na porta ' + process.env.PORT)
})