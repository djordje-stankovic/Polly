const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [ true, 'You need email']
    },
    password :{
        type: String,
        required: [ true, 'You need password']
    }
})
const User = mongoose.model('User', userSchema)

module.exports = User