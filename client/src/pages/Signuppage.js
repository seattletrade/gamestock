import React from 'react';
import { Link } from "react-router-dom";
import Signup from '../components/Signup'
import Login from '../components/Login'

export default function Authpage() {
    return (
        <div>
            <Signup />
            <p className="text-center">Already a user 
            <Link className="ml-2"
                to="/gamestock/login">
                   Log In
            </Link> 
                
            </p>       
        </div>
    )
}
