const axios = require("axios");
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
    getCurrentPrice: function (req, res) {
        axios.get(`${process.env.QUOTE_ENDPOINT_ALPHAVANTAGE}&symbol=${req.params.companySymbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
        .then(data =>{
            res.json(data.data);
        })
        .catch(err => console.log(err))
    },
    getCompanyInfo: function (req, res) {
        axios.get(`${process.env.COMPANYINFO_ALPHAVANTAGE}&symbol=${req.params.companySymbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
        .then(data =>{
            res.json(data.data);
        })
        .catch(err => console.log(err))
    },

    dailyMargetData: function (req, res) {
        axios.get(`${process.env.ALPHAVANTAGE_QUERY_DAILY}&symbol=${req.params.companySymbol}&outputsize=${req.params.outputSize}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
        .then(data =>{
            res.json(data.data);
        })
        .catch(err => console.log(err))
        
    },

    intraMarketData: function (req, res) {
        // console.log(req.params.interval);
        axios.get(`${process.env.ALPHAVANTAGE_QUERY_INTRADAY}&symbol=${req.params.companySymbol}&interval=${req.params.interval}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
        .then(data =>{
            res.json(data.data);
        })
        .catch(err => console.log(err))
    }
}