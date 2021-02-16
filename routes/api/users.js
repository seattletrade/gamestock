const router = require("express").Router();
const usersController = require("../../controllers/userController");

// Matches with "/api/users"


router.route("/")
.post(usersController.createUser);


module.exports = router;