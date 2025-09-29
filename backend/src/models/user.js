const {model, Schema} = require('mongoose')


const userSchema = new Schema({
   fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
      type: String,
      minlength:6,
        required: true
    },
    profilePic:{
        type:String,
        default:''
    },

},{timestamps: true})

const User = model('User', userSchema)
module.exports = User

