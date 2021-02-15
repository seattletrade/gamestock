import axios from "axios";

export default {
    getStockMarketData: (endPoint) => {
        return axios.get(endPoint);
    },
    getCurrentPrice: (companySymbol) => {
        return axios.get("/api/alphaVantage/currentPrice/" + companySymbol)
    },
    // saveTransaction: (boughtStockData) => {
    //     return axios.post("/api/transaction", boughtStockData)
    // },
    // investedMoeny: (totalInvested) => {
    //     return axios.post("/api/userInfo", totalInvested)
    // },

    createUser: (email)=> {
        return axios.post("/api/user", email)
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
    }
}