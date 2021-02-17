import React, { useState } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import "./style.scss"
import Logo from "../Logo";
import { useAuth } from '../../contexts/AuthContext'



export default function Nav() {
    const location = useLocation();
    const [error, setError] = useState();
    const { currentUser, logout, signup, login } = useAuth();
    const history = useHistory()

    const handleLogout = async () => {
        setError('')
        try {
            await logout();
            history.push("/gamestock")
        } catch {
            setError('Failed to logout')
        }
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="navbar-brand" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link
                    to="/gamestock/"
                    className={location.pathname === "/gamestock/" ? "nav-link active" : "nav-link"}
                >
                    <Logo />
                </Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link
                            to="/gamestock/user"
                            className={location.pathname === "/gamestock/user" ? "nav-link active" : "nav-link"}
                        >
                            user
                    {/* maybe label with username, "profile," etc? */}
                        </Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link
                            to="/gamestock/trade"
                            className={location.pathname === "/gamestock/trade" ? "nav-link active" : "nav-link"}
                        >
                            trade
                        </Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link
                            to="/gamestock/search"
                            className={location.pathname === "/gamestock/search" ? "nav-link active" : "nav-link"}
                        >
                            search
                        </Link>
                    </li>

                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        {!currentUser ?
                            <>
                                <Link className={location.pathname === "/gamestock/login" ? "nav-link active" : "nav-link"} to="/gamestock/login" >Login</Link>
                                <Link className={location.pathname === "/gamestock/signup" ? "nav-link active" : "nav-link"} to="/gamestock/signup">Signup</Link>
                            </> :
                            <>
                                <div className="ml-auto text-white" >Email: {currentUser.email}</div>
                                <Link className="mx-2 text-white" to="/gamestock/" onClick={handleLogout} variant="link">logout</Link>
                            </>
                        }
                    </li>
                </ul>
            </div>

        </nav>
    )
}
