const db = require("../models");

// Defining methods for the booksController
module.exports = {   
  createBuyTrn: function(req, res) {
    db.Transaction
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createSellTrn: function(req, res) {
    db.Transaction
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
