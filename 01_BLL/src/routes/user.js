const express = require('express')
const router = new express.Router()
const User = require('../../../00_DAL/models/user')

// Create a new user
router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({ user })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Get all users
router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

// Delete a user
router.delete('/users/delete', async(req, res) => {
    try {
        const user = await User.findOneAndRemove(req.body)
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

// TODO : Update a user, necessary to create the authentification

module.exports = router