const express = require("express");

const router = express.Router();

const City = require("../models/citiesModel");

const mongoose = require("mongoose");
const {response} = require("express");

//Getting all
router.get("/", async (req, res) => {
    console.log("GET");
    try {
        let cities = await City.find().limit(6);
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Getting one
router.get("/:id", getCity, (req , res) => {
    console.log("GET");
    res.json(res.city)
})

//Post one
router.post("/",async (req, res) => {
    console.log("POST");

    let city = new City(
        {
            city: req.body.city,
            population: req.body.population,
            skyscrapers: req.body.skyscrapers,
            trees: req.body.trees,
            country: req.body.country,
        }
    )
    try {
        const newCity = await city.save();
        res.status(201).json(newCity)
        console.log("saved");
    } catch (err){
        res.status(400).json({message: err.message})
    }

})
router.delete("/:id",getCity, async(req , res) => {
    console.log("DELETE");
    try {
        await res.city.remove()
        res.json({message: "Deleted city"}) //res.city

    } catch(err){
        res.status(500).json({message: err.message})
    }

})
router.options("/", (req , res) => {
    console.log("OPTIONS");
    res.header('Allow', 'GET, POST OPTIONS');
    res.send();

})
router.options("/:id", (req , res) => {
    console.log("OPTIONS");
    res.send("Hello World Jafir.");
})
router.put("/:id", (req , res) => {
    console.log("PUT");
    res.send("PUT");
})
//updating one
router.patch("/:id", getCity, async (req , res) => {
    console.log("PATCH");
    if(req.body.city != null){
        res.city.city = req.body.city
    }
    if(req.body.population != null){
        res.city.population = req.body.population
    }
    if(req.body.country != null){
        res.city.country = req.body.country
    }
    if(req.body.skyscrapers != null){
        res.city.skyscrapers = req.body.skyscrapers
    }
    if(req.body.trees != null){
        res.city.trees = req.body.trees
    }

    try{
        const updatedCity = await res.city.save()
        res.json(updatedCity)
    }catch (err){
        res.status(400).json({message: err.message})

    }

})

async function getCity(req,res,next) {
    let city
    try {
        city = await City.findById(req.params.id);
     if (city == null){
        return res.status(404).json({message: "Can not find city"})
     }
 } catch (err) {
    return res.status(500).json({message: err.message})
 }
    res.city = city
    next()
}

module.exports = router;