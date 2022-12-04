var express = require('express');
const { body, validationResult } = require("express-validator");
const async = require("async");
var csrf = require('csurf');
var csrfProtection = csrf();
var router = express.Router();
var User = require("../models/user");
router.use(csrfProtection);
var passport = require('passport');

router.get("/profile", isLoggedIn ,function (req, res, next){
    res.render('profile');
});

router.get("/logout", isLoggedIn ,function (req, res, next){
    req.logout();
    res.redirect('/');
});

router.use('/',notLoggedIn,function(req,res,next){
    next();
});

router.get("/signup", function (req, res, next){
    var messages = req.flash('error');
    res.render("signup",{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});   
});

router.post("/signup", exports.signUp_post = passport.authenticate('local.signup', {    
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get("/signin", function (req, res, next){

    var messages = req.flash('error');
    res.render("signin",{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});  
});

 
router.post("/signin",passport.authenticate('local.signin', { 
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));






module.exports = router;

function isLoggedIn(req, res, next) {
    
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
