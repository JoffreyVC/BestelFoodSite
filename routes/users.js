//de expres module wordt geimporteerd en gebruikt om een express.router object te maken
var express = require('express');
var router = express.Router();


/* GET users listing. */
//er wordt een route gespecifieerd op dat object
router.get('/', function(req, res, next) {      // tweede argument is callback functie
  res.send('respond with a resource');
});



//dit zorgt ervoor dat de file kan worden geimporteerd in app.js
module.exports = router;
