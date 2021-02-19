import axios from "axios";

export default {
    createUser: (email) => {
        return axios.post("/api/user", email)
    },
    saveBuyTransaction: (stockPurchased) => {
        return axios.post("/api/stocks/buy", stockPurchased)
    },
    saveSellTransaction: (stockSold) => {
        return axios.post("/api/stocks/sell", stockSold)
    },
    getCurrentPrice: (companySymbol) => {
        return axios.get("/api/alphaVantage/currentPrice/" + companySymbol)
    },
    getUserBalance: (email) => {
        return axios.get("/api/user/" + email)
    },
    getAllStocks: (email) => {
        return axios.get("/api/stocks/all/" + email)
    },
    getAllOnWatchList: (email) => {
        return axios.get("api/watchlist/all/" + email)
    },
    deleteOneOnWatchList: (email, symbol) => {
        return axios.delete(`api/watchlist/delete/${email}/${symbol}`)
    },
    saveOnWatchList: (beingWatched) => {
        return axios.post("api/watchlist/new", beingWatched)
    },
    getStockMarketData: (endPoint) => {
        return axios.get(endPoint);
    },

    getCompanyInfoData: (companySymbol) => {
        return axios.get("/api/alphaVantage/companyInfo/" + companySymbol);
    },

    searchEndpoint: (keyword) => {
        return axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keyword + '&apikey=' + process.env.REACT_APP_API_KEY)
    },
    // outputsize=compact ( latest 100 data) , full ( data during 20 years )
    getDailyMarketData: (companySymbol, outputSize) => {
        return axios.get("/api/alphaVantage/dailyMargetData/" + companySymbol + "/" + outputSize);
    },

    // interval=> 15min or 60min
    getIntraMarketData: (companySymbol, interval) => {
        return axios.get("/api/alphaVantage/intraMarketData/" + companySymbol + "/" + interval);
    },

    getSymbols: function () {
        return axios.get("/api/symbols");
    },

    getNews: function () {
        return axios.get("/api/finnhub/getNews");
    },

    getCompanyNews: (symbol) => {
        return axios.get("/api/finnhub/getCompanyNews/" + symbol);
    }
}