const db = require("../models");

// Defining methods for the userController
module.exports = {
    createUser: function(req, res) {
        db.User
          .create({email: req.body.email})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
};
