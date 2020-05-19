const express = require('express')
require('../../00_DAL/mongoose')

// Import mongoose models
const User = require('../../00_DAL/models/user')
const Item = require('../../00_DAL/models/item')

// Import routes
const userRouter = require('./routes/user')
const itemRouter = require('./routes/item')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// Use routes
app.use(userRouter)
app.use(itemRouter)



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})