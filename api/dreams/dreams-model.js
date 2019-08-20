const db = require('../../data/dbConfig');

module.exports = {
    addDream,
    getDreamById,
    getDreams,
    getDreamJournals,
    updateDream,
    removeDream,
    getImageById,
    UDImageFetch
}

function getDreams() {
    let query = db('dreams')
        .join('mympyImages', 'dream_id', 'dreams.id')
        .join('users', 'user_id', 'users.id')
        .select('dreams.id', 'dreams.dream_name', 'dreams.dream_short_description', 'dreams.donation_goal', 'dreams.donations_received', 'users.username', 'mympyImages.img_url')

    return query
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

function getDreamJournals(id){
    let query = db('journals')
        .where('dream_id', id)
    
    return query
}

function getImageById(dream_id) {
    let query = db('mympyImages');
        return query
            .where('dream_id', dream_id)
}

function UDImageFetch(dream_id) {
    let query = db('mympyImages');
        return query
            .where('dream_id', dream_id)
            .first()
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
