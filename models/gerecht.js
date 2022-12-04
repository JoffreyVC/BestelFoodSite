const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const GerechtSchema = new Schema({
  name: { type: String, required: true , maxLength: 100 ,minLength: 3 },
  categorie: { type: Schema.Types.ObjectId, ref: "Categorie", required: true },
  prijs: {type: Number, required: true, },
  beschrijving: {type: String },
  afbeelding: {type: String},

});

GerechtSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/gerecht/${this._id}`;
});


module.exports = mongoose.model("Gerecht", GerechtSchema);