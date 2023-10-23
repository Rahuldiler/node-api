const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoute');
require("./db/connection")
const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(express.json());
app.use("/drdriver", userRoutes);


const start = () =>
{
    try
    {
        app.listen(PORT, () =>
        {
            console.log(`Server started on ${PORT}`);
        });
    } catch (error)
    {
        console.log("Error occurred during starting the server");
    }
}

start();
