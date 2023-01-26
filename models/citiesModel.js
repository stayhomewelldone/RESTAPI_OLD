// File: ./models/somemodel.js

// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const CitySchema = new Schema({

    city:{
        type: String,
        required: true,
    },
    population:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required:true,
    },
    skyscrapers:{
        type: String,
        required:true,
    },
    trees:{
        type: String,
        required:true,
    },

    date:{
        type: Date,
        required: true,
        default: Date.now()
    }

});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("City", CitySchema);
