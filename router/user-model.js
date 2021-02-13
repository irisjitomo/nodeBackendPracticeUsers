const db = require('../database/dbConfig')

module.exports = {
    getUsers,
    addUser,
    editUser,
    findById,
    deleteUser,
    getNameOnly,
    getLessThan10AndMoreThan10
}

function getUsers() {
    return db('users')
}

function getNameOnly() {
    return db.select('name').table('users')
}

function getLessThan10AndMoreThan10() {
    return db('users')
    .where('id', '<', 7)
    .orWhere('id', '>', 9)
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
    .where('id', Number(id))
    .update(user)
}

function deleteUser(id) {
    return db('users')
    .where({ id: Number(id)})
    .delete()
}