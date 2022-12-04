var express = require('express');
const { body, validationResult } = require("express-validator");
const async = require("async");
//var csrf = require('csurf');
//var csrfProtection = csrf();
//var router = express.Router();
var passport = require('passport');
var User = require("../models/user");
const Order = require("../models/order");
//router.use(csrfProtection);

exports.signUp_get = function (req, res, next){

    var messages = req.flash('error');
    res.render("signup",{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
    
};

exports.signUp_post = passport.authenticate('local.signup', {   
    
    successRedirect: '/catalog/profile',
    failureRedirect: '/catalog/user/signup',
    failureFlash: true
});

exports.signIn_get = function (req, res, next){
    var messages = req.flash('error');
    res.render("signin",{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});  
};

exports.signIn_post = passport.authenticate('local.signin', { 
    successRedirect: '/catalog/profile',
    failureRedirect: '/catalog/user/signin',
    failureFlash: true
});

exports.logOut_get = function (req, res, next){

    req.logout();
    res.redirect('/');
};

exports.profile_get = function (req, res, next){
    Order.find({user: req.user}, function(err, orders){
        if (err){
            return res.write("Error");
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('profile',{test: req.isAuthenticated(), orders:orders});
    });
};

function isLoggedIn (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn (req, res, next){
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}





