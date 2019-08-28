const db = require('../../data/dbConfig');

module.exports = {
    addUserPayment,
    getUserPaymentsById
}

//Adds a payment information to the user-payment table. This helps us to keep track of the payments for a single user

function addUserPayment(userPayment) {
    return db('user-payment')
        .insert(userPayment, 'id')
}

//Retrieves payment information for a single user by using the user_id

function getUserPaymentsById(id) {
    let userPayments = db('user-payment')
        .where('user_id', id)

    return userPayments
}

