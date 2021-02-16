const router = require("express").Router();
const finnhubController = require("../../controllers/finnhubController");

// Matches with "/api/finnhub/getNews"
router.route("/getNews")
    .get(finnhubController.getNews);


module.exports = router;