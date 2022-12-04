const async = require("async");
const Gerecht = require("../models/gerecht");
const Categorie = require("../models/categorie");
const WinkelMand = require("../models/winkelmand");





exports.gerecht_detail = (req, res, next) => {
    
  Gerecht.findById(req.params.id)
    .populate("_id")
    .exec((err, gerecht) => {
      if (err) {
        return next(err);
      }
      if (gerecht == null) {
        // No results.
        const err = new Error("Gerecht not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      const item = new WinkelMandItem({ productId:gerecht._id, hoeveelheid:0 });
      res.render("gerecht_detail", {
        title: `${gerecht.name}`,
        gerecht,
        item,
          
      });
    });
};


exports.gerecht_detail = (req, res, next) => {
  async.parallel(
    {
      gerecht(callback) {
        Gerecht.findById(req.params.id)
          .populate("_id")
          .exec(callback);
      },
      winkelmand(callback) {
        WinkelMand.findById("637f96ac626036ade76c8182").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);       
      }
      if (results.gerecht == null) {
        // No results.
        const err = new Error("gerecht not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("gerecht_detail", {
        title: results.gerecht.name,
        winkelmand: results.winkelmand,
        gerecht: results.gerecht,
      });
    }
  );
};






