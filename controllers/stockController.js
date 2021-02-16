const db = require("../models");

module.exports = {


    findByUser : function(req, res){
        db.Stock
        .find({user_email : req.params.email} )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    totalInvByUser: function(req,res){
      db.Stock
      .aggregate([
        {$match : { user_email : req.params.email }},
        {
          $group : { 
              "_id" : null, 
              "invBalance" : { 
                  $sum : { 
                      $multiply : ["$avg_price", "$amount"]
                  }
              }
          }
        }
      ]).then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

    },


    buyStock : function(req, res){
      
      db.User.findOne({email:req.body.email})
      .then(data =>{
        bal = data.balance;
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
          })
          .then( () => {
            db.User.findOneAndUpdate({email: req.body.email},{balance: bal - req.body.amount*req.body.price})
            .then(() =>{
              db.Stock.find({user_email:req.body.email, symbol: req.body.symbol}).
              then( stocks => {
                if (stocks.length ===0){
                  db.Stock.create(
                    {user_email: req.body.email,
                    amount: parseFloat( req.body.amount) ,/// Schema.Types.Decimal128
                    symbol: req.body.symbol,
                    avg_price: req.body.price
                  })
                  .then(dbModel => res.json(dbModel))
                }
                else{
                  db.Stock.updateOne({user_email:req.body.email, symbol: req.body.symbol},{amount: stocks[0].amount+ parseFloat(req.body.amount),avg_price: (req.body.price*req.body.amount+stocks[0].avg_price*stocks[0].amount)/(stocks[0].amount+parseFloat(req.body.amount))})
                  .then(dbModel => res.json(dbModel))
                }
              })
            })
          })
        }
      })
      .catch(err => res.status(422).json(err))

    },

    sellStock : function(req,res){
      db.Stock.findOne({user_email:req.body.email, symbol: req.body.symbol}).then(data => {
        if (data.amount < req.body.amount){
          res.status(401).json(data);
        }
        else{
          //create transaction, update user balance, update or delete stock balance 
          db.Transaction.create({
            user_email: req.body.email,
            amount: req.body.amount,
            symbol: req.body.symbol,
            price: req.body.price,
            buy: false
          })
          .then()
        }
      })
    }
      
}

