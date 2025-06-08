import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    type: {
        type: String, // Ex: 'cachorro', 'gato'
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String
    },
    photo: {
        type: String,
        default: 'https://placehold.co/600x400'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Pet = mongoose.model("Pet", PetSchema)

export default Pet