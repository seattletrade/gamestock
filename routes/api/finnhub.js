const router = require("express").Router();
const finnhubController = require("../../controllers/finnhubController");

// Matches with "/api/finnhub/getNews"
router.route("/getNews")
    .get(finnhubController.getNews);
// Matches with "/api/finnhub/getCompanyNews"
router.route("/getCompanyNews/:symbol")
    .get(finnhubController.getCompanyNews);

module.exports = router;