
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware.js');
const bcrypt = require('bcryptjs');
const { validateUserBody, validateUserId } = require('./users-middleware')
const router = require('express').Router();

const getUsers = async (req, res) => { //temporary get request I made for testing
  try {
    const users = await Users.get();

    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({ success: false, err });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let newUser = req.body;

    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    const updateUser = await Users.update(id, req.body);

    updateUser 
    ? res.status(200).json({ message: 'successfully updated credentials' }) 
    : res.status(404).json({ message: 'missing required fields' })
  } catch(err) {
    res.status(500).json({ success: false, err })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await Users.remove(id);

    success ?
    res.status(204).end() : res.status(404).end();
  } catch(err) {
    res.status(500).json({ success: false, err })
  }
}



module.exports = router;

router.delete('/:id', validateUserId, deleteUser)
router.put('/:id', validateUserBody, validateUserId, updateUser)
router.get('/', getUsers)
  




