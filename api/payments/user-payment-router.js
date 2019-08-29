const router = require('express').Router();

const userPaymentModel = require('./user-payment-model');

module.exports = router;

router.post('/', addUserPayment);
router.get('/:id', getUserPayments);

//Posts the user payment infomration to the user-payment table

function addUserPayment(req, res) {
    const newUserPayment = req.body;

    userPaymentModel.addUserPayment(newUserPayment)
        .then(ids => {
            res.status(200).json(ids)
        })
        .catch(error => {
            res.status(500).json({ error, msg: 'Failed to add Payment to the database' })
        })
}

//Retrieves payment information for a single user by using the user_id

function getUserPayments(req, res) {
    const user_id = req.params.id;
    userPaymentModel.getUserPaymentsById(user_id)
        .then(payments => {
            res.status(200).json(payments)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}