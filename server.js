const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config()

//MIDDILWARES
const app = express()
app.use(cors())
app.use(express.json())

// Routes
const routes = require('./routes/index')

//ROUTES
app.use('/dev/api/v1', routes)


app.get('/', (req, res, next) => {
    res.send("all Good")
})


// Catching 404 Error
app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE')
    error.status = 404
    next(error);
})

//Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD)
    , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
        console.log("Databse connected")
    }).catch((err) => {
        console.log("Error in connecting to DataBase", err.message)
    })

app.listen(PORT, () => {
    console.log("Server started", PORT)
})


// module.exports.handler = serverless(app);
// 
// 
// mongodb://127.0.0.1:27017/servimate
// process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD)

// "start": "pm2-runtime start ecosystem.config.js --env production"

