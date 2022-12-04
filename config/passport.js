var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//zegt hoe passport de user moet opslaan in de session
passport.serializeUser(function(user, done){ 
    done(null,user.id);
                       
});
//zegt hoe passport de user uit de session kan halen
passport.deserializeUser(function(user, done){
    User.findById(user.id, function(err, user){
        done(err,user)
    });
                       
});

//Door deze methode weet passport hoe die een nieuwe user moet maken 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    
}, function(req, email, password, done){
    req.checkBody('email','Ongeldige email').notEmpty().isEmail();
    req.checkBody('password','Ongeldig wachtwoord').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error',messages));
    }
    
    User.findOne({'email': email},function(err,user){        
        if (err){
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'Email is already in use'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result){
        if (err) {
            return done(err);
        }
        return done(null, newUser);
    });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    
    req.checkBody('email','Ongeldige email').notEmpty().isEmail();
    req.checkBody('password','Ongeldig wachtwoord').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error',messages));
    }
    
    User.findOne({'email': email},function(err,user){        
    if (err){
        return done(err);
    }
    if (!user) {
        return done(null, false, {message: 'No user found!'});
    }
    if (!user.validPassword(password)){
        return done(null, false, {message: 'Wrong password'});
    }  
    return done(null, user);
    });
}));
     
