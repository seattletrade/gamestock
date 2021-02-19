const axios = require("axios");
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

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
        let toDate = new Date().toISOString().slice(0, 10)

        let d = new Date();
        let sevenDaysAgo = d.setDate(d.getDate() - 7);
        sevenDaysAgo = new Date(sevenDaysAgo).toISOString().slice(0, 10);

        axios.get(`https://finnhub.io/api/v1/company-news?symbol=${req.params.symbol}&from=${sevenDaysAgo}&to=${toDate}&token=${process.env.FINNHUB_API_KEY}`)
            .then(data => {
                res.json(data.data);
            })
            .catch(err => console.log(err))
    }
}