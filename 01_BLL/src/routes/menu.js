const express = require('express')
const router = new express.Router()
const Menu = require('../../../00_DAL/models/menu')
const authAsAdmin = require('../middleware/authAsAdmin')


// ADMIN : Add new item
router.post('/add/menu', authAsAdmin, async(req, res) => {
    const item = new Menu(req.body)

    try {
        await item.save()

        res.status(201).send({ item })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Get all menu
router.get('/menu', async(req, res) => {
    try {
        const menuItems = await Menu.find({})
        res.send(menuItems)
    } catch (err) {
        res.status(500).send()
    }
})


// ADMIN - Delete item by id
router.delete('/delete/menu/:id', authAsAdmin, async(req, res) => {
    try {
        const item = await Menu.findByIdAndRemove(req.params.id)

        if (item)
            res.status(200).send(item)
        else
            res.status(404).send({ 'error': 'item not found!' })
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router