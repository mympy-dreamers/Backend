const db = require('../../data/dbConfig');

module.exports = {
    addDream,
    getDreamById,
    getDreams
}

function getDreams() {
    return db('dreams')
}

function getDreamById(id) {
    let query = db('dreams');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}

function addDream(dream) {
    return db('dreams')
        .insert(dream, 'id')
}

