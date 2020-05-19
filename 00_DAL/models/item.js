const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: { 
        type: String
    },
    price: { 
        type: Number
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item