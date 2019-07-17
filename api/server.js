const express = require('express');
const cors = require('cors');
const server = express();

const authRouter = require('./auth/signUp-router.js');
const userRouter = require('./users/users-router.js');

server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/users", userRouter);

server.get('/', (req, res) => {
    res.status(200).json({ Title: 'Mympy Server Up!' });
});


module.exports = server;