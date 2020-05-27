const express = require('express')
require('../../00_DAL/mongoose')

// Import mongoose models
const User = require('../../00_DAL/models/user')
const Order = require('../../00_DAL/models/order')

// Import routes
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// Use routes
app.use(userRouter)
app.use(orderRouter)



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})