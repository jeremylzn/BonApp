const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,   
        required: true, // set field as required
        trim: true,     // Removes spaces from beginning and end of a string
        lowercase: true // use .toLowerCase() on the string
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User