const axios = require("axios");
const router = require("express").Router();
require('dotenv').config()

module.exports = {
    getCompanyInfo: function (req, res) {
        // console.log("Inside Controller!! - test");
        // console.log(req.params.companySymbol);
        // console.log(`${process.env.COMPANYINFO_ALPHAVANTAGE}&symbol=${req.params.companySymbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`);
        
        axios.get(`${process.env.COMPANYINFO_ALPHAVANTAGE}&symbol=${req.params.companySymbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
        .then(data =>{
            // console.log(data.data);
            res.json(data.data);
        })
        .catch(err => console.log(err))
        
    }
}