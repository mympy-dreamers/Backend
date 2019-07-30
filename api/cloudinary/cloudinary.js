const express = require('express');
const cloudinary = require('cloudinary');
const multipart = require("connect-multiparty")();
require('dotenv').config();

const db = require('../../data/dbConfig.js');
const server = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

server.post('/', multipart, (req, res) => {

    const { dream_id } = req.body;

    cloudinary.v2.uploader.upload(
        req.files.image.path,
        async function (error, result) {
            if (error) {
                res.status(500).json({ message: "Unable to Upload Image" })
            }

            else {

                try {

                    if (!dream_id) {

                        res.status(422).json({ message: "Dream ID is required!" });

                    }

                    else {
                        await db.insert({ img_url: result.url, dream_id }).into('mympyImages')

                        const image = await db.select().from('mympyImages').where('img_url', result.url).first();


                        res.status(201).json({ image })
                    }
                }

                catch (err) {
                    res.status(500).json({ message: err });
                }
            }

        })
})

module.exports = server;

// make copy of this route for user pics

