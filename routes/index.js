var express= require('express');
var router = express.Router();
var passport = require('passport');
var User  = require('../models/user')
const middleware = require('../middleware/index')
const { check, validationResult } = require('express-validator/check');

router.get('/login', function(req,res){
    res.render('auth/login')
})

router.get('/', function(req, res){
    res.render('index')
})


module.exports = router;