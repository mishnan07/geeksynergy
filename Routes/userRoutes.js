const express = require('express')
const nocache = require('nocache')
const session = require('express-session');

const userController = require('../Controllers/userController')
const auth = require('../Middleware/userAuth')
const userRoute = express()

require('dotenv').config();
const oneDay = 1000 * 60 * 60 * 24;
userRoute.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

userRoute.use(nocache());

userRoute.set('view engine','ejs');
userRoute.set('views', './Views/User'); 

userRoute.get('/login',auth.isLogout,userController.Login)
userRoute.post('/login',auth.isLogout,userController.Siginin)
userRoute.get('/register',auth.isLogout,userController.Register)
userRoute.post('/register',auth.isLogout,userController.Registration)
userRoute.get('/home',auth.isLogin,userController.Home)
userRoute.get('/logout', auth.isLogin, userController.userLogout);




module.exports = userRoute