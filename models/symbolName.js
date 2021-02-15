const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symbolNameSchema = new Schema({
    "Company Name": { type: String, required: true },
    "Financial Status": { type: String, required: true },
    "Market Category": { type: String, required: true },
    "Round Lot Size": { type: String, required: true },
    "Security Name": { type: String, required: true },
    "Symbol": { type: String, required: true },
});

const Book = mongoose.model("SymbolName", symbolNameSchema);

module.exports = Book;