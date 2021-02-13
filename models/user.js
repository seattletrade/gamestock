const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  balance: {type: Schema.Types.Decimal128, default: 10000.00}
});

const User = mongoose.model("User", userSchema);

module.exports = User;