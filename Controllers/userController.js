const express = require('express')
const bcrypt = require("bcrypt");
const userModel = require('../Models/userModel')

let success = null
let failure = null


const Login = async(req,res)=>{
    try {
        res.render('login',{success,failure})
        success=null
        failure=null
    } catch (error) {
        console.log(error.message);
    }
}
const Siginin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        let admin = role==='user'?false:true
        const user = await userModel.findOne({ email: email, isAdmin:admin });


        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            req.session.userId = user._id; 

            if (passwordMatch && role === 'user') {      
                res.redirect('/home?success=successfully%20logged%20in');
                success = null
            }
            else if(passwordMatch && role === 'admin'){
                success = 'successfully Loged'
                res.redirect('/admin/home?success=successfully%20logged%20in');
                success = null
            } else {
                res.render('login', {success, failure: 'Invalid email or password' });
                failure=null
            }
        } else {
            res.render('login', { success,failure: 'No user found' });
            failure=null
        }
    } catch (error) {
        console.error(error);
        res.render('register', { success,failure: 'Internal Server Error' });
        failure=null
    }
};



const Register = async(req,res)=>{
    try {
        res.render('register',{success,failure})
        success=null
        failure=null
    } catch (error) {
        console.log(error.message);
    }
}


const Registration = async (req, res) => {
    try {
        const { name, email, phone, profession, password, role } = req.body;

        const userExist =await userModel.findOne({email:email})
        if(!userExist){
        const passwordHash = await bcrypt.hash(password, 10);
        const admin = role === 'user' ? false : true;

        const user = new userModel({
            name: name,
            email: email,
            mobile: phone,
            professional: profession, 
            password: passwordHash,
            isAdmin: admin
        });

        const userData = await user.save();

        if (userData) {
            success = 'successfully completed registration'
            res.render('login');
        } else {
            failure = 'Registration Failed'
            res.render('register',{success,failure});
        }
    }else{
        res.render('register',{failure:'Already existed email'});
    }
    } catch (error) {
        res.render('register',{success,failure});
    }
};


const Home = async(req,res)=>{
    try {
        const userId = req.session.userId
        const user =await userModel.findOne({_id:userId})
        success = req.query.success;
        res.render('home',{success,failure,user})
        success=null
        failure=null
    } catch (error) {
        console.log(error.message);
    }
}

const userLogout = async (req, res) => {
    try {

        req.session.destroy();
        res.redirect('/login');

    } catch (error) {
        console.log(error.message);

    }
}




module.exports = {
    Login,
    Register,
    Registration,
    Home,
    Siginin,
    userLogout
    // Other exported functions...
};