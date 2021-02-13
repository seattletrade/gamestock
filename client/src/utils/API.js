import axios from "axios";

export default {
    getStockMarketData: (endPoint) => {
        return axios.get(endPoint);
    },

    getCompanyInfoData: (companySymbol) => {
        return axios.get("/api/alphaVantage/companyInfo/" + companySymbol);
    },

    searchEndpoint: (keyword) => {
        return axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keyword + '&apikey=' + process.env.REACT_APP_API_KEY)
    }
};
