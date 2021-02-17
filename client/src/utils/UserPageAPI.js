import axios from "axios";

export default {
    getUserInfo: (email) => {
        return axios.get("/api/userPage/user/" + email)
    },
    getStockList: (email) => {
        return axios.get("/api/userPage/stocks/" + email)
    }
}