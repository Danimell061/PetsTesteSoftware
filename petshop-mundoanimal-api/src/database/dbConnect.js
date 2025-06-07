import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export default function(){
        mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('MongoDB conectado!')
    }).catch((err)=>{
        console.log(err)
    })
}