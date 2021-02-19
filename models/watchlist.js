const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
  user_email: {type: String, required:true},
  symbol: {type: String, required:true},
  companyName: {type: String, required: false}
  //date: { type: Date, default: Date.now }
  
});

const Stock = mongoose.model("Watchlist", watchlistSchema );

module.exports = Stock;