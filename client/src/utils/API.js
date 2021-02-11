import axios from "axios";

export default {
    authUser: function(userInfo) {
        return axios.post("/api/user/login", userInfo);
    } 
};
