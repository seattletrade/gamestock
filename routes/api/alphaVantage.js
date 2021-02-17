const router = require("express").Router();
const alphaVantageController = require("../../controllers/alphaVantageController");

// Matches with "/api/alphaVantage/companyInfo/:companyName"
router.route("/companyInfo/:companySymbol")
.get(alphaVantageController.getCompanyInfo);
// Matches with "/api/alphaVantage/currentPrice/:companyName"
router.route("/currentPrice/:companySymbol")
.get(alphaVantageController.getCurrentPrice);
  
// Matches with "/api/alphaVantage/dailyMargetData/:companyName/:outputSize"
router.route("/dailyMargetData/:companySymbol/:outputSize")
.get(alphaVantageController.dailyMargetData);

// Matches with "/api/alphaVantage/intraMarketData/:companyName/:interval"
router.route("/intraMarketData/:companySymbol/:interval")
.get(alphaVantageController.intraMarketData);

module.exports = router;