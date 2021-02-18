const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  user_email: {type: String, required:true},
  amount: {type: Number, required:true} ,/// Schema.Types.Decimal128
  symbol: {type: String, required:true},
  avg_price: {type:Number, required:true }
  //date: { type: Date, default: Date.now }
  
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
