const db = require('../../data/dbConfig');

module.exports = {
    addDreamPayment,
    getDreamPaymentsById

}



function addDreamPayment(dreamPayment) {
    return db('dream-payment')
        .insert(dreamPayment, 'id')
}

function getDreamPaymentsById(id) {
    let dreamPayments = db('dream-payment')
        .where('dream_id', id)

    return dreamPayments
}

