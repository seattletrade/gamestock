const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/gamestock"
  );

const stockSeed = [
    {
        "user_email": "cong@hotmail.com",
        "amount": 70,
        "symbol": "MSFT",
        "avg_price": 208.78
    }, 
    {
        "user_email": "cong@hotmail.com",
        "amount": 155,
        "symbol": "TSLA",
        "avg_price": 316.76
    },
    {
      "user_email": "cong@hotmail.com",
      "amount": 55,
      "symbol": "GME",
      "avg_price": 177.47
  },

]

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