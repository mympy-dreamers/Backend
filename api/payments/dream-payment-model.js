const db = require('../../data/dbConfig');

module.exports = {
    addDreamPayment,
    getDreamPaymentsById

}

//Adds a payment information to the dream-payment table. This helps us to keep track of the payments for a single dream

function addDreamPayment(dreamPayment) {
    return db('dream-payment')
        .insert(dreamPayment, 'id')
}

//Retrieves payment information for a single dream

function getDreamPaymentsById(id) {
    let dreamPayments = db('dream-payment')
        .where('dream_id', id)

    return dreamPayments
}

