const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('userInfo');
}

function findById(id) {
    return db('userInfo')
    .where({ id })
    .first()
}

async function add(userInfo) {
    const [id] = await db('userInfo').insert(userInfo);

    return findById(id);
}

function update(id, changes) {
    return db('userInfo')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('userInfo')
    .where({ id })
    .del();
}