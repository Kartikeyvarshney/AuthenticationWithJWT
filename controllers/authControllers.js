const User = require('../models/User')
module.exports.signup_get = (req,res)=>{
    res.render('signup')
}

module.exports.signup_post = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.create({email,password})
        res.status(201).json(user)
    }
    catch(err){
        console.log(err.message)
        res.status(404).send("error user not created")
    }
}

module.exports.login_get = (req,res)=>{
    res.render('login')
}

module.exports.login_post = (req,res)=>{
    res.send('new login')
}
