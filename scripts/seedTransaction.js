const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/gamestock"
  );

const transactionSeed = [
    {
        "user_email": "cong@hotmail.com",
        "amount": 10,
        "symbol": "MSFT",
        "price": 215.36,
        "date": "2020-10-15",
        "buy": true     
    },
    {
        "user_email": "cong@hotmail.com",
        "amount": 5,
        "symbol": "MSFT",
        "price": 204.34,
        "date": "2020-09-15",
        "buy": true     
    },
    {
        "user_email": "cong@hotmail.com",
        "amount": 55,
        "symbol": "MSFT",
        "price": 207.99,
        "date": "2020-07-15",
        "buy": true     
    },
    {
        "user_email": "cong@hotmail.com",
        "amount": 20,
        "symbol": "TSLA",
        "price": 635.35,
        "date": "2020-12-15",
        "buy": true     
    },
    {
        "user_email": "cong@hotmail.com",
        "amount": 110,
        "symbol": "TSLA",
        "price": 285.99,
        "date": "2020-07-15",
        "buy": true     
    },
    {
        "user_email": "cong@hotmail.com",
        "amount": 25,
        "symbol": "TSLA",
        "price": 197.25,
        "date": "2020-06-15",
        "buy": true     
    },

]

db.Transaction
  .remove({})
  .then(() => db.Transaction.collection.insertMany(transactionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });