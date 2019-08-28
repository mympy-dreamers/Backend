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

// Returns list of dreams from dreams table with dreams.id, dreams.dream_name, dreams.dream_short_description, dreams.donation_goal, dreams.donations_received, users.username, mympyImages.img_url

function getDreams() {
    let query = db('dreams')
        .join('mympyImages', 'dream_id', 'dreams.id')
        .join('users', 'user_id', 'users.id')
        .select('dreams.id', 'dreams.dream_name', 'dreams.dream_short_description', 'dreams.donation_goal', 'dreams.donations_received', 'users.username', 'mympyImages.img_url')

    return query
}


//Returns a information regarding a single dream at an id. Returns dreams.id, dreams.dream_name, dreams.dream_short_description, dreams.long_description, dreams.donation_goal, dreams.donations_received, dreams.user_id. Also returns dream_pic which contains mympyImages.id, mympyImages.img_url, and mympyImages.dream_id

function getDreamById(id) {
    let query = db('dreams');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}

//Returns the information of a single journal when a dream_id is passed that contains journals.id, journals.timestamps, journals.title, journals.body, journals.user_id, journals.dream_id

function getDreamJournals(id) {
    let query = db('journals')
        .where('dream_id', id)

    return query
}

//Returns information regarding a single image when a dream_id is passed as a parameter. Returns mympyImages.id, mympyImages.img_url (which is an image url from cloudinary), and mympyImages.dream_id
function getImageById(dream_id) {
    let query = db('mympyImages');
    return query
        .where('dream_id', dream_id)
}

//Returns the same information as getImageById. This is used in the updateDream route.
function UDImageFetch(dream_id) {
    let query = db('mympyImages');
    return query
        .where('dream_id', dream_id)
        .first()
}

//Posts new dream to dreams table.  
function addDream(dream) {
    return db('dreams')
        .insert(dream, 'id')
}

//Updates a dream 
function updateDream(id, changes) {
    return db('dreams')
        .where({ id })
        .update(changes, '*')
}

//Deletes a dream
function removeDream(id) {
    return db('dreams')
        .where({ id })
        .del();
}
