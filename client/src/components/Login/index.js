import React from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <div className="w-50 border border-5 mx-auto" >
            <p className="h1 text-center">Log In</p>
            <form className="p-2 m-2">                
                <div className="form-group">                
                    <input type="email" className="form-control" name="email" placeholder="email"/>
                </div>
                <div className="form-group">                
                    <input type="password" className="form-control" name="password" placeholder="password"/>
                </div>               
                <div className="text-center">
                <button type="submit" className="btn btn-primary ">
                       <Link className="text-white text-decoration-none" to="/gamestock/user">Log In</Link> 
                    </button>
                </div>
            </form>
        </div>
    )
}
