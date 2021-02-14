const db = require("../models");

module.exports = {
  createUser: function(req, res) {
    db.User
      .create({email: req.body.email})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

    findByUser : function(req, res){
        db.Stock
        .find({user_email : req.params.email} )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    buyStock : function(req, res){
      
      db.User.findOne({email:req.body.email})
      .then(data =>{
        if (data.balance < req.body.price*req.body.amount){
          res.status(401).json(data);
        }
        else{
          ///forget to update balance !!!!!!!!
          /// add transaction, add stock data
          db.Transaction.create({
            user_email: req.body.email,
            amount: req.body.amount,
            symbol: req.body.symbol,
            price: req.body.price
          }).then( () =>{
            db.Stock.find({user_email:req.body.email, symbol: req.body.symbol}).
            then( stocks => {
              if (stocks.length ===0){
                db.Stock.create(
                  {user_email: req.body.email,
                  amount: req.body.amount ,/// Schema.Types.Decimal128
                  symbol: req.body.symbol,
                  avg_price: req.body.price
                })
                .then(dbModel => res.json(dbModel))
              }
              else{
                db.Stock.updateOne({user_email:req.body.email, symbol: req.body.symbol},{amount: stocks[0].amount+req.body.amount,avg_price: (req.body.price*req.body.amount+stocks[0].avg_price*stocks[0].amount)/(stocks[0].amount+req.body.amount)})
                .then(dbModel => res.json(dbModel))
              }
            })
          })
        }
      })
      .catch(err => res.status(422).json(err))

    }
      
}

