const express = require('express')
const router = new express.Router()
const Order = require('../../../00_DAL/models/order')

// Create a new order
router.post('/orders', async (req, res) => {
    const order = new Order(req.body)

    try {
        await order.save()

        res.status(201).send({ order })
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router