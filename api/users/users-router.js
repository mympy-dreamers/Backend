
const Users = require('./users-model.js');
const bcrypt = require('bcryptjs');
const { validateUserBody, validateUserId } = require('./users-middleware')
const router = require('express').Router();

module.exports = router;

router.get('/', getUsers)
router.get('/:id', getUserById)
router.get('/:id/dreams', getUserDreams)
router.delete('/:id', validateUserId, deleteUser)
router.put('/:id', validateUserId, updateUser)


async function getUsers(req, res) { //temporary get request I made for testing
  try {
    const users = await Users.get();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not find user table' });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await Users.get(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not find user by id' })
  }
}

async function getUserDreams(req, res) {
  try {
    const { id } = req.params;
    const userDreams = await Users.getUserDreams(id);

    res.status(200).json(userDreams);
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not find user Dreams by id' });
  }
};

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    let newUser = req.body;

    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    const updateUser = await Users.update(id, req.body);

    updateUser
      ? res.status(200).json({ message: 'successfully updated credentials' })
      : res.status(404).json({ message: 'missing required fields' })
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not update user' })
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const success = await Users.remove(id);

    success ?
      res.status(204).end() : res.status(404).end();
  } catch (err) {
    res.status(500).json({ success: false, err, msg: 'could not delete user' })
  }
}

