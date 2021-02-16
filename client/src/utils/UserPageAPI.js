import axios from "axios";

export default {
    getUserInfo: (email)=> {
        return axios.get("/api/user/" + email)
    },
}