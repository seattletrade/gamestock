const router = require("express").Router();
const stocksController = require("../../controllers/stockController");

// Matches with "/api/stocks"


router.route("/buy")
.post(stocksController.buyStock);

router.route(":email")
.get(stocksController.findByUser);

router.route("/total/:email")
.get(stocksController.totalInvByUser);


module.exports = router;