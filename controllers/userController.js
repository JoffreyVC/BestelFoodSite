const User = require("../models/user");
const { body, validationResult } = require("express-validator");




exports.user_create_get = (req, res, next) => {
    res.render("logIn_form", {
      title: "Log in"
    });

};



