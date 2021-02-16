const axios = require("axios");
require('dotenv').config()

module.exports = {
    getNews: function (req, res) {
        axios.get(`https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_API_KEY}&minId=6000000`)
            .then(data => {
                res.json(data.data);
            })
            .catch(err => console.log(err))
    }
}