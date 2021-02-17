const axios = require("axios");
require('dotenv').config()

module.exports = {
    getNews: function (req, res) {
        axios.get(`https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_API_KEY}&minId=6000000`)
            .then(data => {
                res.json(data.data);
            })
            .catch(err => console.log(err))
    },
    getCompanyNews: function (req, res) {
        //need to update from and to dates
        axios.get(`https://finnhub.io/api/v1/company-news?symbol=${req.params.symbol}&from=2020-04-30&to=2020-05-01&token=${process.env.FINNHUB_API_KEY}`)
            .then(data => {
                res.json(data.data);
            })
            .catch(err => console.log(err))
    }
}