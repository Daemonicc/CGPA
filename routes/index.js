var express= require('express');
var router = express.Router();
var passport = require('passport');
var User  = require('../models/user')
const middleware = require('../middleware/index')
const { check, validationResult } = require('express-validator/check');


router.get('/login', function(req,res){
    res.render('auth/login')
})
router.post('/login',passport.authenticate('local',{
    failureRedirect: '/login',
    failureFlash: 'Invalid Username or Password',
}) , function(req,res){
    req.flash('success', `Welcome back ${req.user.firstname}`)
    res.redirect('/')
});

router.get('/register', function(req,res){
    res.render('auth/register')
})

router.post('/register', [
    // username must be string
    check('username').isString().trim().escape().isLength({min: 5}),
    // password must be at least  chars long
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('firstname').isString().trim().escape(),
    check('lastname').isString().trim().escape(),
    check('email').isEmail().withMessage('Enter a Valid Email')
  ], function(req, res){
      const errors = validationResult(req);
      if (!errors.isEmpty()){
          errors.array().forEach((error) => {
              req.flash('error', error.msg + '<br>')
          })
          return res.redirect('/register')
      }
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message)
            return res.redirect('back');
        }
        user.referal = req.params.username
        user.firstname = req.body.firstname
        user.lastname = req.body.lastname
        user.email = req.body.email
        user.save()
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome. Please keep your username and password save as it can not be recovered')
            res.redirect('/')
        })
    })
})
router.get('/add/:level', middleware.isLoggedIn, function(req, res){
    res.render('index', {level: req.params.level})
})

router.get('/', middleware.isLoggedIn, function(req, res){
    res.render('select')
})

router.post('/add/:level', middleware.isLoggedIn, function(req, res){
     const level = req.params.level
    if(level == 100){
        User.findOneAndUpdate({"username": req.user.username}, {"year1": req.body, "cgpa.year1": req.body.cgpa}, function(err, user){
            if (err){
                console.log(err)
            }
            console.log(req.body)
            console.log(user)
        })
    }else if(level == 200){
        User.findOneAndUpdate({"username": req.user.username}, {"year2": req.body}, function(err, user){
            if (err){
                console.log(err)
            }
        })
    }else if(level == 300){
        User.findOneAndUpdate({"username": req.user.username}, {"year3": req.body}, function(err,user){
             if (err){
                console.log(err)
            }
        })
    }else if(level == 400){
         User.findOneAndUpdate({"username": req.user.username}, {"year4": req.body}, function(err, user){
            if (err){
                console.log(err)
            }
         })
    }else if(level == 500){
        User.findOneAndUpdate({"username": req.user.username}, {"year5": req.body}, function(err,user){
            if (err){
                console.log(err)
            }
        })

    }
    req.flash('success', 'Updated')
    res.redirect('back')
})


module.exports = router;