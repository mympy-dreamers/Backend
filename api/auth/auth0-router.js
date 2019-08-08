const router = require("express").Router();
const db = require("../users/users-model.js");

module.exports = router;

router.post('/register', register);

router.post('/login', login);

function login(req, res) {
    const { auth_id } = req.body

    db.getAuthId(auth_id)
        .then(user => {
            db.get(user.id).then((user) => {
                res.status(200).json(user);
            }).catch(err => {
                res.status(500).json({
                    err: err.message,
                    error: 'Could not find user'
                });
            })
        }).catch(err => {
            res.status(500).json({
                err: err.message,
                error: 'Could not find user by auth_id'
            });
        })


}


function register(req, res) {
    let user = req.body

    db.add(user)
        .then(user => {
            db.get(user[0].id).then((user) => {
                res.status(200).json(user);
            }).catch(err => {
                res.status(500).json({
                    err: err.message,
                    error: 'Could not find user'
                });
            })
        })
        .catch(err => {
            res.status(500).json({
                err: err.message,
                error: 'Could not create the new user'
            });
        });
}

