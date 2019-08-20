const db = require('../../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findDream,
    findUser,
    getDreamJournals
}

function find() {
    return db('journals');
}

function findById(id) {
    return db('journals')
    .where({ id })
    .first()
}

function add(journal) {
    return db('journals')
        .insert(journal)
        .returning("*");
}

function update(id, changes) {
    return db('journals')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('journals')
    .where({ id })
    .del();
}

function findUser(id) {
    return db('users')
    .where({ id })
}

function findDream(id){
    return db('dreams')
    .where({ id })
}