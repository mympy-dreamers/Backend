const db = require('../../data/dbConfig');

module.exports = {
    addDream,
    getDreamById,
    getDreams,
    updateDream,
    removeDream
}

function getDreams() {
    return db('dreams')
    .join('mympyImages', 'dream_id', 'dreams.id')
    .join('users', 'user_id', 'users.id')
    .select('dreams.dream_name', 'dreams.dream_short_description', 'dreams.donation_goal', 'dreams.donations_received', 'users.username', 'mympyImages.img_url')
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

function updateDream(id, changes) {
    return db('dreams')
    .where({ id })
    .update(changes, '*')
}

function removeDream(id) {
    return db('dreams')
    .where({ id })
    .del();
}
