const router = require("express").Router();
const watchlistController = require("../../controllers/watchlistController");

// Matches with "/api/stocks"


/// all stocks person have
router.route("/all/:email")
.get(watchlistController.findByUser);

/// add new one 
router.route("/new")
.post(watchlistController.create);

router.route("/delete/:email/:symbol")
.delete(watchlistController.delete);

module.exports = router;