const Review = require("../models/review");
const { body, validationResult } = require("express-validator");


exports.review_list = function (req, res, next) {
  Review.find().exec(function (err, list_reviews) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("review_list", {
        title: "All reviews",
        review_list: list_reviews,
      });
    });
};


exports.review_detail = (req, res, next) => {
  Review.findById(req.params.id)
    .populate("titel")
    .exec((err, review) => {
      if (err) {
        return next(err);
      }
      if (review == null) {
        // No results.
        const err = new Error("review not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("review_detail", {
        title: `${review.name}`,
        review,
      });
    });
};

exports.review_create_get = (req, res, next) => {
    res.render("review_form", {
      title: "Create review"
    });

};



