const db = require('../../data/dbConfig');

module.exports = {
    addUserPayment,
    getUserPaymentsById
}



function addUserPayment(userPayment) {
    return db('user-payment')
        .insert(userPayment, 'id')
}

function getUserPaymentsById(id) {
    let userPayments = db('user-payment')
        .where('user_id', id)

    return userPayments
}

