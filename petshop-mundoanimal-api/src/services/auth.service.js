import User from "../models/User.js";

const authService = {
    login: (email) => User.findOne({ email: email }) 
}

export default authService