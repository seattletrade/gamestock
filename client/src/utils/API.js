import axios from "axios";

export default {
    getStockMarketData: (endPoint) => {
        return axios.get(endPoint);
    },

    getCompanyInfoData: (companySymbol) => {
        return axios.get("/api/alphaVantage/companyInfo/" + companySymbol);
    },
};
