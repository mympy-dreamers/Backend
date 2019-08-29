const router = require('express').Router();
const { validateDreamBody, validateDreamId } = require('./dreams-middleware')
const dreamsModel = require('./dreams-model');

module.exports = router;


//all endpoints are found below and begin with api/dreams

router.get('/', getDreams)
router.get('/:id', getDreamById);
router.get('/image/:id', getImageById);
router.get('/:id/journals', getDreamJournals);
router.post('/', validateDreamBody, addDream);
router.put('/:id', validateDreamId, updateDream);
router.delete('/:id', validateDreamId, deleteDream);

//Fetches all dreams in dreams db

function getDreams(req, res) {
    dreamsModel.getDreams()
        .then(dreams => {
            res.status(200).json(dreams)
        })
        .catch(error => {
            res.status(400).json({ error, msg: 'Could not get from dreams database' })
        })
}

//Fetches dream by dream id

function getDreamById(req, res) {
    const id = req.params.id;
    dreamsModel.getDreamById(id)
        .then(dream => {
            dreamsModel.getImageById(id)
                .then(image => {
                    res.status(200).json({ ...dream, dream_pic: image })
                })
                .catch(error => {
                    res.status(400).json(error)
                })
        })
        .catch(error => {
            res.status(400).json(error)
        })
}

//Fetches dream by dream id

function getImageById(req, res) {
    const dream_id = req.params.id;
    dreamsModel.getImageById(dream_id)
        .then(image => {
            res.status(200).json(image)
        })
        .catch(error => {
            res.status(400).json({ error, msg: 'Failed to grab dream by Id' })
        })
}

//Retrieves journals associated with a single dream by using the dream_id

async function getDreamJournals(req, res) {
    try {
        const { id } = req.params;
        const dreamJournals = await dreamsModel.getDreamJournals(id);

        dreamJournals
            ? res.status(200).json(dreamJournals)
            : rest.status(400).json({ msg: 'The action failed.' })

    } catch (err) {
        res.status(500).json({ success: false, err, msg: 'Failed to retrieve the journals of your dream' });
    }
}

// Makes a post to the dreams table

function addDream(req, res) {
    const newDream = req.body;

    dreamsModel.addDream(newDream)
        .then(ids => {
            res.status(200).json(ids)
        })
        .catch(error => {
            res.status(500).json({ error, msg: 'Failed to add Dream to the database' })
        })
}

//Updates information about a dream

async function updateDream(req, res) {
    try {
        const { id } = req.params;
        const updateDream = await dreamsModel.updateDream(id, req.body);

        if (updateDream) {
            const updatedDream = await dreamsModel.getDreamById(id);
            const dreamImage = await dreamsModel.UDImageFetch(id);

            res.status(200).json({ ...updatedDream, img_url: dreamImage.img_url })
        } else {
            res.status(404).json({ message: 'missing required fields' })
        }
    } catch (err) {
        res.status(500).json({ success: false, err })
    }
}

//Removes dream from dreams table

function deleteDream(req, res) {
    const { id } = req.params;

    dreamsModel.removeDream(id)
        .then(dream => {
            res.status(200).json(dream)
        })
        .catch(error => {
            res.status(400).json({ error, msg: 'Failed to delete Dream' })
        })
}

