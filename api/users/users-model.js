const db = require('../../data/dbConfig.js');

module.exports = {
    get,
    add,
    login,
    remove,
    register,
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

async function register(newUser) {
    const [id] = await db('users').insert(newUser);
    
    return findById(id);
}

function findById(id) {
    return db('users')
    .where({ id })
    .first()
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