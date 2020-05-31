const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../../../00_DAL/models/user')

// Create a new user
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

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

// Delete a user by id
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

// Get currently logged in user
router.get('/users/home', auth, async (req, res) => {
    res.send(req.user)
})

// TODO : Update a user, necessary to create the authentification

module.exports = router