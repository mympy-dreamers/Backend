const db = require('../../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('journals');
}

function findById(id) {
    return db('journals')
    .where({ id })
    .first()
}

async function add(journal) {
    const [id] = await db('journals').insert(journal);

    return findById(id);
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