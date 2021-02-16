const db = require("../models");

// Defining methods for the userController
module.exports = {
    createUser: function(req, res) {
        db.User
          .create({email: req.body.email})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

      getUserInfo: function(req, res) {
        db.User
            .find({"email": req.params.email})
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err))
      }
};

        // .find({"email" : req.params.email})