const express = require('express');
const cors = require('cors');
const server = express();

server.use(require("body-parser").text());


const authRouter = require('./auth/signUp-router.js');
const authZeroConfig = require('./auth/auth0-config-router.js')
const authZeroRouter = require('./auth/auth0-router');
const userRouter = require('./users/users-router.js');
const dreamsRouter = require('./dreams/dreams-router');
const journalsRouter = require('./journals/journals-router');
const sendEmail = require('./sendgrid/sendgrid.js');
const imagesRouter = require('./cloudinary/cloudinary');
const stripeRouter = require('./stripe/stripe');

server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/dreams", dreamsRouter);
server.use("/api/journals", journalsRouter);
server.use("/mail", sendEmail);
server.use('/api/images', imagesRouter)
server.use('/auth/zero', authZeroRouter);
server.use('/auth/config', authZeroConfig);
server.use('/stripe', stripeRouter);

server.get('/', (req, res) => {
    res.status(200).json({ Title: 'Mympy Server Up!' });
});


module.exports = server;