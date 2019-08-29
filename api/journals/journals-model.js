const db = require('../../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findDream,
    findUser
}

//Returns all journals for all users

function find() {
    return db('journals');
}

//Returns a single journal by journal id

function findById(id) {
    return db('journals')
        .where({ id })
        .first()
}

//Adds a journal to the journals 

function add(journal) {
    return db('journals')
        .insert(journal, '*')
}

//Updates a single journal

function update(id, changes) {
    return db('journals')
        .where({ id })
        .update(changes, '*')
}

//Removes a single journal by id

function remove(id) {
    return db('journals')
        .where({ id })
        .del();
}

//Returns information on a single user by user id

function findUser(id) {
    return db('users')
        .where({ id })
        .first()
}

//Returns information on a single dream by dream id

function findDream(id) {
    return db('dreams')
        .where({ id })
        .first()
}