const async = require("async");
const Categorie = require("../models/categorie");
const Gerecht = require("../models/gerecht");

exports.index =(req, res) => {
    res.render("index")
};



exports.categorie_list = function (req, res, next) {
  Categorie.find({})
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("categorie_list", { title: "Categorieën", categorie_list: list_categories });
    });
};

exports.categorie_detail = (req, res, next) => {
  async.parallel(
    {
      categorie(callback) {
        Categorie.findById(req.params.id).exec(callback);
      },

      categorie_gerecht(callback) {
        Gerecht.find({ categorie: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.categorie == null) {
        // No results.
        const err = new Error("categorie not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("categorie_detail", {
        title: "Categorieën",
        categorie: results.categorie,
        categorie_gerecht: results.categorie_gerecht,
      });
    }
  );
};