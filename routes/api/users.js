const router = require("express").Router();
const usersController = require("../../controllers/userController");

// Matches with "/api/users"


router.route("/")
.post(usersController.createUser);

router.route("/:email")
  .get(usersController.findUser);

module.exports = router;