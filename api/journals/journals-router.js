const express = require('express');
const Journals = require('./journals-model')
const router = express.Router();
const { validateUserID, validateDreamID, validateJournalBody, validateJournalID } = require('./journals-middleware');


router.get('/', getJournals)
router.get('/:id', validateJournalID, getJournalById);
router.post('/', validateJournalBody, addJournal);
router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);

async function getJournals(req, res){
    try {
        const journals = await Journals.find();

        res.status(200).json(journals);
    } catch(err) {
        res.status(500).json({ success: false, err, msg: 'Failed to retrieve the journals database' });
    }
}

async function getJournalById(req, res){
    try {
        const {id} = req.params;
        const journal = await Journals.findById(id);

        res.status(200).json(journal);
    } catch(err) {
        res.status(500).json({ success: false, err, msg: 'Failed to retrieve the specified journal' });
    }
}

async function addJournal(req, res){
    try {
        const newJournal = await Journals.add(req.body);

        res.status(201).json(newJournal);
    } catch(err) {
        res.status(500).json({ success: false, err, msg: 'Failed to add the journal.' });
    }
}

async function updateJournal (req, res){
    try {
        const {id} = req.params;
        const updateJournal = await Journals.update(id, req.body);

        updateJournal
        ? res.status(200).json({ message: 'successfully updated journal' })
        : res.status(404).json({ message: 'journal not found'})
    } catch(err) {
        res.status(500).json({ success: false, err, msg: 'Failed to update the journal.' });
    }
}

async function deleteJournal(req, res){
    try {
        const {id} = req.params;
        const success = await Journals.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({ success: false, err, msg: 'Failed to delete the journal.' });
    }
}

module.exports = router;