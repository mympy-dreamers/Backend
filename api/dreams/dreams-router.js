const router = require('express').Router();
const { validateDreamBody, validateDreamId } = require('./dreams-middleware')
const dreamsModel = require('./dreams-model');

module.exports = router;

router.get('/', getDreams)
router.get('/:id', getDreamById);
router.get('/image/:id', getImageById);
router.post('/', validateDreamBody, addDream);
router.put('/:id', validateDreamId, updateDream);
router.delete('/:id', validateDreamId, deleteDream);


function getDreams(req, res) {  //fetches all dreams in dreams db
    dreamsModel.getDreams()
        .then(dreams => {
            res.status(200).json(dreams)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}

function getDreamById(req, res) {  //fetches dream by dream id
    const id = req.params.id;
    dreamsModel.getDreamById(id)
        .then(dream => {
            res.status(200).json(dream)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}

function getImageById(req, res) {  //fetches dream by dream id
    const dream_id = req.params.id;
    dreamsModel.getImageById(dream_id)
        .then(image => {
            res.status(200).json(image)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}

//I added the middleware according to what is notNullable
function addDream(req, res) {

    dreamsModel.addDream(req.body)
        .then(ids => {
            res.status(200).json(ids)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

function updateDream(req, res) {
    const { id } = req.params;

    dreamsModel.updateDream(id, req.body)
        .then(([dream]) => {
            res.status(200).json(dream)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}

function deleteDream(req, res) {
    const { id } = req.params;

    dreamsModel.removeDream(id)
        .then(dream => {
            res.status(200).json(dream)
        })
        .catch(error => {
            res.status(400).json(error)
        })
}

