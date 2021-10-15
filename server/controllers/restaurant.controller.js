const Restaurant = require("../models/restaurant.model");

module.exports = {
    //find All

    findAllRestaurants: (req, res) =>{
        console.log("All the Restaurants!");
        Restaurant.find({})
        .then((allRestaurants) =>{
            res.json(allRestaurants);
        })
        .catch((err) =>{
            console.log("Get all restaurants failed");
            res.status(400).json(err);
        })
    },

    //find one restaurant

    findOneRestaurant: (req, res) =>{
        Restaurant.findOne({_id: req.params.id})
        .then((oneRestaurant) => res.json(oneRestaurant))
        .catch((err) =>{
            console.log("Find one restaurant failed");
            res.status(400).json(err);
        })
    },

    //create new restaurant

    createNewRestaurant: (req, res) =>{
        Restaurant.create(req.body)
        .then((newRestaurant) =>
        res.json(newRestaurant))
        .catch((err) =>{
            console.log("Create new restaurant failed");
            res.status(400).json(err)
        })
    },

    //Update Restaurant

    updateRestaurant: (req, res) =>{
        Restaurant.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
        )
            .then(updatedRestaurant => res.json(updatedRestaurant))
            .catch((err) =>{
                console.log("Updated restaurant failed");
                res.status(400).json(err)
            })
    },

    //delete restaurant

    deleteRestaurant: (req, res) =>{
        Restaurant.deleteOne({_id: req.params.id})
        .then((deletedRestaurant) => res.json(deletedRestaurant))
        .catch((err) =>{
            console.log("Deleted restaurant failed");
            res.status(400).json(err)
        })
    }
}