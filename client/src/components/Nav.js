import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
    const location = useLocation();
    return (
        <ul className="nav justify-content-end">
            <li className="nav-item">
                <Link
                    to="/gamestock/"
                    className={location.pathname === "/gamestock/" ? "nav-link active" : "nav-link"}
                >
                    GameStock
                    {/* change to clickable logo to homescreen */}
                </Link>
            </li>
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
    )
}
