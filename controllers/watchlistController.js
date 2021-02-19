const db = require("../models");

module.exports = {

    findByUser : function(req, res){
        db.Watchlist
        .find({user_email : req.params.email} ).sort("symbol")
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    create: function(req,res){
        db.Watchlist
        .find({user_email:req.body.email, symbol:req.body.symbol})
        .then( data =>{
            if (data.length >0){
                res.status(401).json(data);
              }
            else{
                db.Watchlist
                .create({
                    user_email: req.body.email,
                    symbol: req.body.symbol,
                    companyName: req.body.companyName
                })
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
            }
        })
        .catch(err => res.status(422).json(err));
    },

    delete: function(req,res){
        db.Watchlist
        .deleteOne({user_email: req.params.email,symbol:req.params.symbol})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}