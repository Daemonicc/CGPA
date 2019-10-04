var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    firstname: {type: String, default: ''},
    lastname: {type: String ,default: ''},
    email: {type: String, default: ''},
    years: {type: String, default: ''},
    year1: {
        course: [],
          credit: [],
          grade: []
    },
    year2:  {
        course: [],
          credit: [],
          grade: []
    },
    year3:  {
        course: [],
          credit: [],
          grade: []
    },
    year4: {
        course: [],
          credit: [],
          grade: []
    },
    year5: {
        course: [],
          credit: [],
          grade: []
    },
    cpga: {
      year1: {type:Number, default: 0},
      year2: {type:Number, default: 0},
      year3: {type:Number, default: 0},
      year4: {type:Number, default: 0},
      year5:{type:Number, default: 0}
    },
    created: {type:  Date, default: Date.now}
    

})

UserSchema.plugin(passportLocalMongoose);
mongoose.models = {}
module.exports = mongoose.model('User', UserSchema)