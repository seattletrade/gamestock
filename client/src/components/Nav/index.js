import React from 'react';
import { Link, useLocation } from "react-router-dom";
import "./style.scss"
import Logo from "../Logo";



export default function Nav() {
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">

            <div className="navbar-brand">
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
                    <li className="nav-item">
                        <Link
                            to="/gamestock/user"
                            className={location.pathname === "/gamestock/user" ? "nav-link active" : "nav-link"}
                        >
                            user
                    {/* maybe label with username, "profile," etc? */}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/gamestock/trade"
                            className={location.pathname === "/gamestock/trade" ? "nav-link active" : "nav-link"}
                        >
                            trade
        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/gamestock/search"
                            className={location.pathname === "/gamestock/search" ? "nav-link active" : "nav-link"}
                        >
                            search
        </Link>
                    </li>
                    {/* logout link here somewhere */}
                </ul>
            </div>

        </nav>
    )
}
