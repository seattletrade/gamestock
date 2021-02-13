const db = require("../models");

module.exports = {
    findByUser : function(req, res){
        db.Stock
        .aggregate([{ $match : { user_email : req.params.user_email } },
        {
        $group :
            {
            _id : "$symbol",
            totalinitial: { $sum: { $multiply: [ "$price_initial", "$amount" ]} },
            total_amount: {$sum :"$amount"}
            }
        },
    ])
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    findByUserSymbol: function(req,req){
        db.Stock
        .aggregate([{ $match : { user_email : req.params.user_email } },
        {
          $group :
            {
              _id : "$"+req.params.symbol,
              totalinitial: { $sum: { $multiply: [ "$price_initial", "$amount" ]} },
              total_amount: {$sum :"$amount"}
            }
         },
      ])
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
        },    
}
