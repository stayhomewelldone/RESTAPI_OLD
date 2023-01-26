require('dotenv').config()

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = process.env.DATABASE_URL;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to database"));

const bodyParser = require('body-parser');

const express = require("express");

// const cors = require("cors");

const app = express();

const citiesRouter = require("./routers/citiesRouter");

//Middleware
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/cities/", citiesRouter)

//Listen on port 8000
app.listen(8000,() => {console.log("Express started");
})