const db = require('../../data/dbConfig.js');

module.exports = {
    get,
    register,
    login,
    remove,
    update
}

function get(id) {
    let query = db('user');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}

function login(username) {
    let query = db('user').select('username', 'id', 'password', 'email');

    return query
        .where('username', username)
        .first()
}

function register(newUser) {
    return db('users')
    .insert(newUser)
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