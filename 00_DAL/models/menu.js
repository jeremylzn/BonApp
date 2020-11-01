const mongoose = require('mongoose')
const User = require('./user')
const moment = require('moment')

const itemMenuSchema = new mongoose.Schema({
    itemID: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imagePath: {
        type: String,
        required: true
    }

});


// itemMenuSchema.pre("save", async function(next) {
//     const item = this

//     next()
// })

const Menu = mongoose.model('Menu', itemMenuSchema)

module.exports = Menu