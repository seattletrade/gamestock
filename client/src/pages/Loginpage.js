import React, {useState}  from 'react';
import { Link } from "react-router-dom";
import Signup from '../components/Signup'
import Login from '../components/Login'
import API from '../utils/API'

export default function Loginpage() {
    const [userInfo, setUserInfo] = useState[{}];

    const hanldeInputChange = (e) => {
        const {name, value} = e.target;
        setUserInfo({...userInfo, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(userInfo.email && userInfo.password) {
            API.authUser({
                email: userInfo.email,
                password: userInfo.password
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }
    return (
        <div>
            <Login 
                hanldeInputChange={hanldeInputChange}
                hangleSubmit={handleSubmit}
            />
            <p className="text-center">Not a user yet
            <Link className="ml-2"
                to="/gamestock/signup">
                   Sign Up
            </Link>                  
            </p>       
        </div>
    )
}