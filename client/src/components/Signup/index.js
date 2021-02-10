import React from 'react'
import {Link} from 'react-router-dom';

export default function Signup() {
    return (
        <div className="w-50 border border-5 mx-auto" >
            <p className="h1 text-center">Sign Up Form</p>
            <form className="p-2 m-2">
                <div className="form-group">                
                    <input type="text" className="form-control" name="name" placeholder="full name"/>
                </div>
                <div className="form-group">                
                    <input type="text" className="form-control" name="phone" placeholder="phone number"/>
                </div>
                <div className="form-group">                
                    <input type="email" className="form-control" name="email" placeholder="email"/>
                </div>
                <div className="form-group">                
                    <input type="password" className="form-control" name="password" placeholder="password"/>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox"/> Terms and conditions</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary ">
                       <Link className="text-white text-decoration-none" to="/gamestock/user">Create Account</Link> 
                    </button>
                </div>
            </form>
        </div>
    )
}
