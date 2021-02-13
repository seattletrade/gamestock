import axios from "axios";

export default {
    getStockMarketData: (endPoint) => {
        return axios.get(endPoint);
    },

    getCompanyInfoData: (companySymbol) => {
        return axios.get("/api/alphaVantage/companyInfo/" + companySymbol);
    },

    // outputsize=compact ( latest 100 data) , full ( data during 20 years )
    getDailyMarketData: (companySymbol, outputSize) => {
        return axios.get("/api/alphaVantage/dailyMargetData/" + companySymbol + "/" + outputSize);
    },

     // interval=> 15min or 60min
    getIntraMarketData: (companySymbol, interval) =>{
        return axios.get("/api/alphaVantage/intraMarketData/" + companySymbol + "/" + interval);
    }
};
