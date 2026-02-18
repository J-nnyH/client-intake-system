const express = require ('express');
const app = express()
const clientRouter = require('./routes/clientRouter')
const mongoose =require ('mongoose');
const cors = require('cors');

// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(cors({ origin: 'https://client-intake-system.netlify.app/'}));

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//connect to DB
mongoose.connect(process.env.DB_STRING)


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.use(express.json());
app.use('/api', clientRouter)

// console.log(app)

//listening
const PORT= process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('running on Port '+ PORT)
})