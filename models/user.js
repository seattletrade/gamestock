const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  balance: {type: Number, default: 10000.00},
  investingStartDay: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;