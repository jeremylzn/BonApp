const express = require('express')
const router = new express.Router()
const Item = require('../../../00_DAL/models/item')

// Create a new item
router.post('/items', async (req, res) => {
    const item = new Item(req.body)

    try {
        await item.save()

        res.status(201).send({ item })
    } catch (err) {
        res.status(400).send(err)
    }
})




module.exports = router