const bodyParser = require('body-parser')
var express = require('express')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./models/user')
const localStrategy = require('passport-local')
const methodOverride = require('method-override')
const indexRoute = require('./routes/index')
const app = express()



app.use(express.static(__dirname  + '/public'))
app.set('view engine', 'ejs');
// mongoose.connect('mongodb://localhost:27017/cgpa', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://Diane:mamma@cluster0-yajnl.mongodb.net/cgpa?retryWrites=true', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
 

app.use(require('express-session')({
    secret: 'Best friend',
    resave: false,
    saveUninitialized: false
  }))

    app.use(flash())
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(function(req,res,next){
      res.locals.currentUser = req.user;
      res.locals.error = req.flash("error");
      res.locals.success = req.flash("success")
      next();
    })

app.use(indexRoute)
app.listen(process.env.PORT || 8080, process.env.IP, function(){
    console.log("Server Has Started!");
 });
