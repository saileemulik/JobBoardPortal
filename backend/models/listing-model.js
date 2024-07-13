const {Schema , model, Mongoose} = require("mongoose");
const listingSchema = new Schema({
    title:{type: String, required: true},
    company:{type: String, required: true},
   location:{type: String, required: true},
  description:{type: Array, required: true},
   requirements:{type: Array, required: true},
    posted_at:{type: Date, required: true},
    deadline:{type: Date},
});
const Listings = new model("Listing",listingSchema);
module.exports = Listings;