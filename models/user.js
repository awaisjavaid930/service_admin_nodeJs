const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema =  mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
    },
    status : {
        type : String
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);