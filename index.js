const express = require ('express');
const app = express()
const clientRouter = require('./routes/clientRouter');
const authRouter = require('./routes/authRouter');
const mongoose =require ('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// const isProduction = process.env.NODE_ENV === 'production';
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

if (!process.env.DB_STRING) {
    throw new Error('Missing DB_STRING in config/.env');
}

if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in config/.env');
}

app.use(cors({ 
    origin: clientOrigin,
    credentials: true
}));

//connect to DB
mongoose.connect(process.env.DB_STRING);


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.use(express.json());
app.use(cookieParser());
app.use('/api', clientRouter);
app.use('/api/auth', authRouter);

// console.log(app)

//listening
const PORT= process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('running on Port '+ PORT)
})