const db = require("../models");

module.exports = {

    getUserInfo: function(req, res) {
        db.User
            .find({"email": req.params.email})
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err))
      },

    getStockList: function(req, res) {
        db.Stock
         .find({"user_email": req.params.email})
         .then(user => res.json(user))
         .catch(err => res.status(422).json(err))
    }
}