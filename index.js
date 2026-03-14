const express = require ('express');
const app = express()
const clientRouter = require('./routes/clientRouter')
const mongoose =require ('mongoose');
const cors = require('cors');

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(cors({ origin: process.env.FRONTEND_URL }));

//connect to DB
mongoose.connect(process.env.DB_STRING)


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.use(express.json());
app.use('/api', clientRouter)


//listening
const PORT= process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('running on Port '+ PORT)
})