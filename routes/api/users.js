const router = require("express").Router();
const usersController = require("../../controllers/userController");

// Matches with "/api/users"


router.route("/")
.post(usersController.createUser);

// Matches with "/api/user/:email"
router.route("/:email")
.get(usersController.getUserInfo);

module.exports = router;