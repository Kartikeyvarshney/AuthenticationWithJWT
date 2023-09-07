const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter an email."],
        unique:true,
        lowercase:true,
        validate:[(val)=>{validator.isEmail},'Please enter the valid email.']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[6,'Minimum password length is 6 characters.']
    }
})

const User = mongoose.model('user',userSchema)

module.exports=User;