const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user_email: {type: String, required:true},
  amount: {type: Number, required:true} ,/// Schema.Types.Decimal128
  symbol: {type: String, required:true},
  price: {type: Number, required:true },
  date: { type: Date, default: Date.now },
  buy: {type: Boolean, required: true, default: true}
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
