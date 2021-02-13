const db = require('../database/dbConfig')

module.exports = {
    getUsers,
    addUser,
    editUser,
    findById,
    deleteUser
}

function getUsers() {
    return db('users')
}

function findById(id) {
    return db('users')
    .where({ id: Number(id)})
    .first()
}

function addUser(user) {
    return db('users')
    .insert(user)
    .then(ids => ({id:ids[0]}))
}

function editUser(id, user) {
    return db('users')
    .where({ id: Number(id)})
    .update(user)
}

function deleteUser(id) {
    return db('users')
    .where({ id: Number(id)})
    .delete()
}