const router = require("express").Router();
const bookRoutes = require("./books");

// AlpahVantage API - Stock markek Data
const alphaVantage = require("./alphaVantage");

// Finnhub API - News Data
const finnhub = require("./finnhub");

//stocks from db
const stockRoutes = require("./stocks");
//users from db
const userRoutes = require("./users")

// AlpahVantage API - Stock markek Data
const userPageRoutes = require("./userPage");

//symbols from db
const symbolNameRoutes = require("./symbolName");

// routes
router.use("/alphaVantage", alphaVantage);
router.use("/books", bookRoutes);
router.use("/stocks",stockRoutes);
// router.use("/user/",userRoutes);
//router.use("/user/",userRoutes);
router.use("/userPage",userPageRoutes);
router.use("/user",userRoutes);
router.use("/finnhub", finnhub);
router.use("/symbols", symbolNameRoutes);

module.exports = router;
