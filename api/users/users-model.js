const db = require('../../data/dbConfig.js');

module.exports = {
    get,
    add,
    login,
    remove,
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

function add(user) {

    return db('users')
        .insert(user);

}

function remove(id) {
    return null;
}