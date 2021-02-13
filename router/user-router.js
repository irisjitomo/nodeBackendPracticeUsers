const router = require('express').Router()

const users = require('./user-model');

// router.get('/users', (req, res) => {
//     users.getUsers()
//     .then(users => {
//         res.status(200).json(users)
//     })
//     .catch(err => {
//         res.status(500).json({message: err})
//     })
// })

router.get('/users', (req, res) => {
    users.getLessThan10AndMoreThan10()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

router.get('/users/:id', (req, res) => {
    let {id} = req.params;
    users.findById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(400).json({message: 'user does not exist'})
        }
    })
    .catch(() => {
        res.status(500).json({message: "could not fulfill request"})
    })
})

router.post('/users', (req, res) => {
    let newUser = req.body
    if (!newUser.name) {
        res.status(400).json({error: 'no name'})
    } else {
        users.addUser(newUser)
        res.status(201).json(newUser)
    }
})

router.delete('/users/:id', (req, res) => {
    let {id} = req.params
    users
    .deleteUser(id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(400).json({message: "user does not exist"})
        }
    })
    .catch(() => {
        res.status(500).json({error: 'user could not be removed'})
    })
})

router.put('/users/:id', (req, res) => {
    let {id} = req.params;
    let updatedBody = req.body
    if (!updatedBody.name) {
        res.status(400).json({message: `${updatedBody} does not include name`})
    } else {
        users
        .editUser(id, updatedBody)
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json(updatedUser)
            } else {
                res.status(400).json({message: 'user with this ID does not exist'})
            }
        })
        .catch(() => {
            res.status(500).json({error: 'could not complete request'})
        })
    }
})

module.exports = router