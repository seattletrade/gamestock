const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/gamestock"
);

const stockSeed = [
  {
    user_email: "olya@test.com" ,
    amount: 1  ,/// Schema.Types.Decimal128
    symbol: "MSFT",
    price_initial: 105.00  
  },
  {
    user_email: "olya@test.com" ,
    amount: 2  ,/// Schema.Types.Decimal128
    symbol: "MSFT",
    price_initial: 100.30 
  },
  {
    user_email: "olya@test.com" ,
    amount: 3  ,/// Schema.Types.Decimal128
    symbol: "MSFT",
    price_initial: 110.00  
  },
  {
    user_email: "olya@test.com" ,
    amount: 1  ,/// Schema.Types.Decimal128
    symbol: "AMZN",
    price_initial: 120.50 
  },
  {
    user_email: "olya@test.com" ,
    amount: 2  ,/// Schema.Types.Decimal128
    symbol: "AMZN",
    price_initial: 115.00  
  },
  {
    user_email: "dima@test.com" ,
    amount: 1  ,/// Schema.Types.Decimal128
    symbol: "FB",
    price_initial: 250.00  
  },
];

db.Stock
  .remove({})
  .then(() => db.Stock.collection.insertMany(stockSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
