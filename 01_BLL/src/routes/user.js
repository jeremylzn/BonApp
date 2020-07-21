const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../../../00_DAL/models/user')

// Sign up new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Log in existing user
router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Log out a user (delete token)
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.token = ''
        await req.user.save()

        res.status(200).send({ message: `${req.user.name} has logged out` })
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Get all users
router.get('/admin/users', async (req, res) => {
    try {
        // TODO: allow for admin only
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Delete a user by id
router.delete('/admin/users/:id', async (req, res) => {
    try {
        // TODO: allow for admin only
        const user = await User.findByIdAndRemove(req.params.id)

        if (user)
            res.status(200).send(user)
        else
            res.status(404).send({ 'error': 'User not found!' })
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