const router = require('express').Router()

const users = require('./user-model');

router.get('/users', (req, res) => {
    users.getUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

module.exports = router