const Listings = require('../models/listing-model');

const searchListings = async (userInput) => {
    try {
        const searchTerm = new RegExp(userInput, 'i');
        const query = {
            $or: [
                { title: { $regex: searchTerm } },
                { company: { $regex: searchTerm } }
            ]
        };
        const searchResults = await Listings.find(query);
        return searchResults;
    } catch (error) {
        console.error("Error during search:", error);
        throw error;
    }
}

module.exports = searchListings;
