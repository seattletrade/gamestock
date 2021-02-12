const router = require("express").Router();
const alphaVantageController = require("../../controllers/alphaVantageController");

// Matches with "/api/apiAlphaVantage/companyInfo/:companyName"
router.route("/companyInfo/:companySymbol")
.get(alphaVantageController.getCompanyInfo);
  

module.exports = router;