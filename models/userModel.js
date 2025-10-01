const crypto = require("crypto")
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,required:[true , "please tell us your firstname"]
    },
    lastname:{
        type:String,required:[true , "please tell us your lastname"]
    },
    username:{
        type:String,required:[true , "please choose a username for your self"] , unique:true ,minLength:6, lowercase:true,
    },
    email:{
        type:String , required:[true , 'please provide your email '],  unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password:{
      type:String,
      required:[true , "please provide your password"],
        minLength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true , "please confirm your password"],
        validate:{
            validator: function (el){
            return el === this.password
        } ,
        message:"Passwords are not the same."
        }
    },
    role:{
        type:String,
        enum:["user" , "admin"],
        default:"user"
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetExpires: Date,

    active:{
        type:Boolean,
        default:true,
        select:false,
    }
})



const User = mongoose.model("User" , userSchema)

module.exports = User