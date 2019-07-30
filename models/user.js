var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    firstname: {type: String, default: ''},
    lastname: {type: String ,default: ''},
    email: {type: String, default: ''},
    years: {type: String, default: ''},
    year1: {type: String, default: ''},
    year2: {type: String, default: ''},
    year3: {type: String, default: ''},
    year4: {type: String, default: ''},
    year5: {type:String, default: ''},
    created: {type:  Date, default: Date.now}

})

UserSchema.plugin(passportLocalMongoose);
mongoose.models = {}
module.exports = mongoose.model('User', UserSchema)