const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// Handle Errors
const handleError = (err) =>{
    console.log(err.message,err.code)
    let errors = {email  : ''  ,password : ''} 


    // Incorrect Email

    if(err.message==='Incorrect email')
    {
        errors.email='This email is not registered'
    }

    // Incorrect Password
    if(err.message === 'Incorrect password')
    {
        errors.password = 'Incorrect password'
    }
    // Duplicate error code

    if(err.code === 11000)
    {
        errors.email="This Eamil is already registered."
        return errors;
    }
    
    // Validation errors

    if(err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach( ({properties} )=> {
            errors[properties.path] = properties.message
        });
    }
    return errors
}

const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:maxAge
    })
}
module.exports.signup_get = (req,res)=>{
    res.render('signup')
}

module.exports.signup_post = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.create({email,password})
        const  token = createToken(user._id);
        res.cookie('jwt' , token , {httpOnly:true, maxAge:maxAge*1000 })
        res.status(201).json({user:user._id})
    }
    catch(err){
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}

module.exports.login_get = (req,res)=>{ 
    res.render('login')
}

module.exports.login_post = async (req,res)=>{
     const {email , password} = req.body;
     
     try{
        const user = await User.login(email,password)
        const  token = createToken(user._id);
        res.cookie('jwt' , token , {httpOnly:true, maxAge:maxAge*1000 })
        res.status(200).json({user:user._id})
     }
     catch(error)
     {
        const errors = handleError(error)
        res.status(400).json({errors})
     }
}

