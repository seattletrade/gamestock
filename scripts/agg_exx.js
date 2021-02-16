const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/gamestock"
);

/*  
///// All stocks for user
db.Stock
  .aggregate([{ $match : { user_email : "olya@test.com" } },
  {
    $group :
      {
        _id : "$symbol",
        totalinitial: { $sum: { $multiply: [ "$price_initial", "$amount" ]} },
        total_amount: {$sum :"$amount"}
      }
   },
])
  .then(data => {
    console.log(data);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
  
*/

///find by user and symbol
/*
 db.Stock
 .aggregate([
    { 
        $match : { user_email : "olya@test.com", symbol: "AMZN" } 
    },
    {  
        $group :
        {
            _id : "$symbol",
            total_amount: {$sum :"$amount"}
        }
    }
    
])
 .then(data => {
   console.log(data);
   process.exit(0);
 })
 .catch(err => {
   console.error(err);
   process.exit(1);
 });
*/


 
/*
 db.Stock
 .find({"user_email":"olya@test.com", "symbol":"MSFT"})
 .then(data => {
    console.log(data);
    process.exit(0);


  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
*/
let sell_am = 4

db.Stock
.find({"user_email":"olya@test.com", "symbol":"MSFT"})
.then(data => {
    console.log(data);
    let toDelete = [];
    let toUpdate = undefined;
    let rest = sell_am;
    data.forEach(st => {
        if (rest>0){
            if(rest>= st.amount){
                rest -=st.amount
                toDelete.push(st._id)
            }
            else{
                toUpdate = {id:st._id, am : st.amount-rest}
                rest = 0;
            }
        }
    });
    console.log(toDelete);
    console.log(toUpdate);

   process.exit(0);


 })
 .catch(err => {
   console.error(err);
   process.exit(1);
 });

