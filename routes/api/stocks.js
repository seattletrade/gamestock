const router = require("express").Router();
const stocksController = require("../../controllers/stockController");

// Matches with "/api/stocks"


router.route("/buy")
.post(stocksController.buyStock);


module.exports = router;