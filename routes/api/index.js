const router = require("express").Router();
const bookRoutes = require("./books");

// AlpahVantage API - Stock markek Data
const alphaVantage = require("./alphaVantage");

//stocks from db
const stockRoutes = require("./stocks");
//users from db
const userRoutes = require("./users")


// routes
router.use("/alphaVantage", alphaVantage);
router.use("/books", bookRoutes);
router.use("/stocks",stockRoutes);
router.use("/users/",userRoutes);

module.exports = router;
