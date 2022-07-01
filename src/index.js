const { Router } = require('express');
const express = require('express');
const fs = require('fs');
const multer = require('multer')
const route = require('./routers/route');
const { default: mongoose } = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://swethaHirge:eNbiwvH7LUDppBrx@cluster0.0xins.mongodb.net/group19?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))





app.use(multer().any())

app.use(express.json())
app.use('/', route)
app.listen(3000, () => {
    console.log("server connected")
})