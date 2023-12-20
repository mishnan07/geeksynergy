const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./Routes/userRoutes')
const adminRoute = require('./Routes/adminRoutes')
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.mongodb;

app.use('/',userRoute)
app.use('/admin',adminRoute)

mongoose.connect(MONGODB_URI)
.then(()=>{
    app.listen(PORT,()=>{console.log('server is connected');})
})
.catch((err)=>{
    console.log('database not connected : ',err);
})