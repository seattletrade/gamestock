import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
    const location = useLocation();
    return (
        <ul className="nav justify-content-end">

            <li className="nav-item">
                <Link
                    to="/gamestock/home"
                    className={location.pathname === "/gamestock/home" ? "nav-link active" : "nav-link"}
                >
                    home
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
                    to="/gamestock/info"
                    className={location.pathname === "/gamestock/info" ? "nav-link active" : "nav-link"}
                >
                    info
        </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/gamestock/"
                    className={location.pathname === "/gamestock/" ? "nav-link active" : "nav-link"}
                >
                    login
        </Link>
            </li>
        </ul>
    )
}
