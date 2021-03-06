const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/gamestock"
);

const userSeed = [
  {
    email: "olya@test.com",
    balance: 10000,
    investingStartDay:  Date.now()
  },
  {
    email: "dima@test.com",
    balance: 9555.55,
    investingStartDay:  Date.now()
  },
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
