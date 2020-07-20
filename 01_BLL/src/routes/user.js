const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../../../00_DAL/models/user')

// Sign up new user
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

// Get all users --- ADMIN ONLY 
router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

// Delete a user by id --- ADMIN ONLY
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


// TODO : Set /admin route for all admin functions and routes
// TODO : Update a user

module.exports = router