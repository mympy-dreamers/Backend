const express = require('express');
const userInfoDB = require('./userInfo-model')
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const userInfos = await userInfoDB.find();

        res.status(200).json(userInfos);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const userInfo = await userInfoDB.findById(id);

        res.status(200).json(userInfo);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}); 

router.post('/', async (req, res) => {
    try {
        const newUserInfo = await userInfoDB.add(req.body);

        res.status(201).json(newUserInfo);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updateUserInfo = await userInfoDB.update(id, req.body);

        updateUserInfo
        ? res.status(200).json({ message: 'successfully updated user bio' })
        : res.status(404).json({ message: 'user bio not found'})
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const success = await userInfoDB.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
});



module.exports = router;