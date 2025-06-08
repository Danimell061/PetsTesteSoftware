import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
import User from "../models/User.js";

const authService = {
    login: (email) => User.findOne({ email: email }),
    generateToken: (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, {expiresIn: 86400})
}

export default authService