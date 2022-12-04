var express = require('express');
var router = express.Router();
var csrf = require('csurf');
//var csrfProtection = csrf();
var router = express.Router();
var csrfExclusion = ['/catalog/checkOut'];

router.use(function(req, res, next){
  if (csrfExclusion.indexOf(req.path) !== -1) {
  next();}
  else {
  csrf()(req, res, next);}
});




// GET home page.
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;

