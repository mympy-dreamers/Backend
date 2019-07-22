const router = require('express').Router();

const dreamsModel = require('./dreams-model');

module.exports = router;

router.get('/:id', getDreamById);
router.post('/', addDream);

function getDreamById(req, res) {
    const id = req.params.id;
    dreamsModel.getDreamById(id)
        .then(dream => {
            res.status(200).json(dream)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}

function addDream(req, res) {
    let { dream_name, dream_short_description, dream_long_description } = req.body
    if (!dream_name || !dream_short_description || !dream_long_description) {
        return res
            .status(400)
            .json({ message: 'Please Fill Out All Required Fields' })
    }
    dreamsModel.addDream(req.body)
        .then(ids => {
            res.status(200).json(ids)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

