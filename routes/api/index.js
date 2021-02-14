const router = require("express").Router();
const bookRoutes = require("./books");

// AlpahVantage API - Stock markek Data
const alphaVantage = require("./alphaVantage");

//stocks from db
const stockRoutes = require("./stocks");


// Book routes
router.use("/alphaVantage", alphaVantage);
router.use("/books", bookRoutes);
router.use("/stocks",stockRoutes);

module.exports = router;
