const router = require("express").Router();

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

// watchlist from db
const watchlistRoutes  = require("./watchlists");

// routes
router.use("/alphaVantage", alphaVantage);
router.use("/stocks",stockRoutes);
// router.use("/user/",userRoutes);
//router.use("/user/",userRoutes);
router.use("/userPage",userPageRoutes);
router.use("/user",userRoutes);
router.use("/finnhub", finnhub);
router.use("/symbols", symbolNameRoutes);
router.use("/watchlist",watchlistRoutes);

module.exports = router;
