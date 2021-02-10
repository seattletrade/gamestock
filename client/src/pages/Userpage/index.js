import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";

export default function Userpage() {
    return (
        <div>
            user portfolio graph here
            <br />
            <div className="flexbox-container">
                <Link
                    to="/gamestock/search"
                    className={
                        location.pathname === "/gamestock/search"
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    search
      </Link>
                <Link
                    to="/gamestock/trade"
                    className={
                        location.pathname === "/gamestock/trade"
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    trade
      </Link>
            </div>
            <br />
      individual portfolio positions here
            <br />
      stock news here
        </div>
    );
}
