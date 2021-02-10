import React from 'react';
import { Link } from "react-router-dom";
import Signup from '../components/Signup'
import Login from '../components/Login'

export default function Authpage() {
    return (
        <div>
            <Login />
            <p className="text-center">Not a user yet
            <Link className="ml-2"
                to="/gamestock/signup">
                   Sign Up
            </Link>                  
            </p>       
        </div>
    )
}