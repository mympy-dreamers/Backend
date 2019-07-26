const db = require('../../data/dbConfig.js');

module.exports = {
    get,
    add,
    login,
    remove,
    update
}

function get(id) {
    let query = db('users');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}

function login(username) {
    let query = db('users').select('username', 'id', 'password', 'email');

    return query
        .where('username', username)
        .first()
}


function add(newUser) {
    return db('users')
        .insert(newUser, 'id')
}

function update(id, changes) {
    return db('users')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('users')
    .where({ id })
    .del();
}