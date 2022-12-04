var express = require('express');
const Gerecht = require("../models/gerecht");
const WinkelMand = require("../models/winkelmand");
const Order = require("../models/order");
const { body, validationResult } = require("express-validator");
const async = require("async");



exports.voegToe = function (req, res, next){
    var productID = req.params.id;
    var cart = new WinkelMand(req.session.cart ? req.session.cart:{});
    Gerecht.findById(productID, function(err, product){
        if (err){
            res.redirect('/catalog/categories');
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        res.redirect('/catalog/categories')
        //var products = cart.generateArray
        //res.render("showWinkelmand",{cart:cart});
    });
};

exports.reduce = function (req, res, next){
    var productId = req.params.id;
    var cart = new WinkelMand(req.session.cart ? req.session.cart:{});
    
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/catalog/showWinkelmand')
};

exports.addOne = function (req, res, next){
    var productId = req.params.id;
    var cart = new WinkelMand(req.session.cart ? req.session.cart:{});
    
    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('/catalog/showWinkelmand')
};


exports.remove = function (req, res, next){
    var productId = req.params.id;
    var cart = new WinkelMand(req.session.cart ? req.session.cart:{});
    
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/catalog/showWinkelmand')
};

exports.show_winkelmand = function (req, res, next){
    if (!req.session.cart) {
        return res.render("showWinkelmand",{cart:null});
    }
    var cart = new WinkelMand(req.session.cart);
    res.render("showWinkelmand",{cart:cart});
};

exports.checkout_winkelmand = function (req, res, next){
    if (!req.session.cart) {
        return res.render("showWinkelmand",{cart:null});
    }
    var cart = new WinkelMand(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render("checkout",{total:cart.totalPrice,errMsg:errMsg, noError: !errMsg});

};

exports.checkout_winkelmand_post = function (req, res, next){
        if (!req.session.cart) {
        return res.render("showWinkelmand",{cart:null});
    }
    var cart = new WinkelMand(req.session.cart);
    const stripe = require('stripe')('sk_test_51M9X0UFo3mQUK8OqeqHDeeNHReFE9TAC85VNfNMIS6P3YaelHEYn0fAY2MIzwdUlI1gTO9sCs71DFxW2DumudA330038cDds9O');
    const charge = stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: 'eur',
      source: req.body.cardToken,
      description: 'Test Charge',
    }, function(err, charge){
        if (err){
            req.flash('error', err.message);
            return res.redirect('/catalog/checkOut')
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name
        })
        order.save(function(err, result){
            req.flash('succes', 'Succesfully bought product!');
            req.cart = null;
            res.redirect('/catalog');
        })
        
        
        
    }
    );
};




exports.winkelmand_detail = (req, res, next) => {  
  WinkelMand.findById(req.params.id).exec((err, winkelmand) => {
      if (err) {
        return next(err);
      }
      if (winkelmand == null) {
        // No results.
        const err = new Error("winkelmand not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("winkelmand_detail", {
        winkelmand
      });
    });
};




