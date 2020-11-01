const express = require('express')
require('../../00_DAL/mongoose') // Establishes the connection to the database
const cors = require('cors') // Allows our server to receive requests from clients on a different origins
const dotenv = require('dotenv') 
dotenv.config() // Makes environment variables available

// Import mongoose models
const User = require('../../00_DAL/models/user')
const Order = require('../../00_DAL/models/order')
const ItemMenu = require('../../00_DAL/models/menu')
// Import routes
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const menuRouter = require('./routes/menu')
// Initialize server
const app = express()
app.use(cors())
app.use(express.static(process.cwd() + "/02_UIL/client/dist/client/"));
app.use(express.json())

const port = process.env.PORT || 3000

// Use routes
app.use(userRouter)
app.use(orderRouter)
app.use(menuRouter)


app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/02_UIL/client/dist/client/index.html")
});

// Listening for incoming connections
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})