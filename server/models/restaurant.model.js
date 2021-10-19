const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Restaurant name is required!"],
        minLength: [2, "A restaurant name must be at least two characters long!"]
    },

    category: {
        type: String,
        required: [true, "A restaurant category is required!"],
        minLength: [2, "A category must be at least two characters long!"]
    },

    website: {
        type: String,
        required: [true, "A restaurant website is required!"],
        minLength: [5, "A category must be at least five characters long!"]
    },

    rating: {
        type: Number,
        required: [true, "Please leave a rating for this restaurant!"],
        enum: [
            1,
            2,
            3,
            4,
            5
        ]
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },

    addedBy: {
        type: String
    }

}, {timestamps: true})

    const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;