const router = require("express").Router();
const bookRoutes = require("./books");

// AlpahVantage API - Stock markek Data
const alphaVantage = require("./alphaVantage");

// Book routes
router.use("/alphaVantage", alphaVantage);
router.use("/books", bookRoutes);

module.exports = router;
