const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorieSchema = new Schema({
  name: { type: String, required: true , maxLength: 100 ,minLength: 3 },
  afbeelding: {type: String, required: true},

});

CategorieSchema.virtual("url").get(function () {
  return `/catalog/categorie/${this._id}`;
});


module.exports = mongoose.model("Categorie", CategorieSchema);

//body{
// background-image: url('/images/curryworst.jpg');
//}