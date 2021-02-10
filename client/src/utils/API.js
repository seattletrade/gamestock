import axios from "axios";

export default {
    getStockMarketData: (endPoint) => {
        return axios.get(endPoint);
    },
};
