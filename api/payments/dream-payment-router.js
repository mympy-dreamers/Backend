const router = require('express').Router();
const dreamsPaymentModel = require('./dream-payment-model');

module.exports = router;

router.post('/', addDreamPayment);
router.get('/:id', getDreamPayments);

//Posts the dream payment infomration to the dream-payment table

function addDreamPayment(req, res) {
    const newDreamPayment = req.body;

    dreamsPaymentModel.addDreamPayment(newDreamPayment)
        .then(ids => {
            res.status(200).json(ids)
        })
        .catch(error => {
            res.status(500).json({ error, msg: 'Failed to add Payment to the database' })
        })
}

//Retrieves payment information for a single dream by using the dream_id

function getDreamPayments(req, res) {
    const dream_id = req.params.id;
    dreamsPaymentModel.getDreamPaymentsById(dream_id)
        .then(payments => {
            res.status(200).json(payments)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}
