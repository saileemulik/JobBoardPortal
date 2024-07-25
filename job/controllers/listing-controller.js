const  Listing = require("../models/listing-model")
const getListings = async(req,res)=>{
    try {
        const response = await Listing.find();
        if(!response){
            res.status(404).json({msg: "No listing found"});
            return;
        }
        res.status(200).json({msg: response});
    } catch (error) {
        console.log(`listings: ${error}`);
    }
}
const createListing = async (req, res) => {
    try {
      const response = req.body;
      await Listing.create(response);
      const deadlineDate = new Date(req.body.deadline);
  if (isNaN(deadlineDate.getTime())) {
    // Invalid date format
    return res.status(400).json({ success: false, error: 'Invalid date format for deadline' });
  }

      return res.status(201).json({ message: "Listing Posted successfully" });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate key error',
          error: `Listing with title "${error.keyValue.title}" already exists.`,
        });
      } else {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    }
  };
  
  
  module.exports = {
    getListings,
    createListing,
  };

