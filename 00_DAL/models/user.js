const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    },
    token: {
        type: String,
        //required: true    -----------> ???
    }
})

// This function generates a jwt and stores 
// it in the database for the current user
userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecrettoken') // TODO : {expiresIn: 'X minutes'}
    user.token = token

    await user.save()

    return token
}

// This function gets email and password, and verifies them
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Password does not match')
    }

    return user
}


// Middleware for hashing the password using bcrypt algorithm
// This runs just before saving the document
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User