const router = require('express').Router();

const userPaymentModel = require('./user-payment-model');

module.exports = router;

router.post('/', addUserPayment);
router.get('/:id', getUserPayments);


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