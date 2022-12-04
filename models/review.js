const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  titel: { type: String, required: true },
  rating: {type: Number, required: true, }, 
  tekst: { type: String, required: true },
  auteur: { type: String, required: true }

});

// Virtual for book's URL
ReviewSchema.virtual("url").get(function () {
  return `/catalog/review/${this._id}`;
});

// Export model
module.exports = mongoose.model("Review", ReviewSchema);