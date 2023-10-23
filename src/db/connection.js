const mongoose = require('mongoose')
const serverURL = process.env.DATABASE_CLIENT_URL
const client = mongoose.connect("mongodb+srv://rahulydv3464:s5k136pUWSfZTHdv@cluster0.hlqzpsq.mongodb.net/")
    .then(() =>
    {
        console.log("connection successfull");
    }).catch(() =>
    {
        console.log("some error come");
    })