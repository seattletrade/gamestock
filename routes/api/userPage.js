const router = require("express").Router();
const userPageController = require("../../controllers/userPageController");


// Matches with "/api/userPage/user/:email"
router.route("/user/:email")
.get(userPageController.getUserInfo);


// Matches with "/api/userPage/stocks/:email"
router.route("/stocks/:email")
.get(userPageController.getStockList);

module.exports = router;