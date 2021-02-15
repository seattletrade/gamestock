import React from "react";
import { Link, useLocation } from "react-router-dom";
import ChartUserInfo from "../../components/ChartUserInfo"
import MyStockList from "../../components/MyStockList"
import "./style.scss";

export default function Userpage() {
    return (
        <div>
            <ChartUserInfo />
            {/* <div className="flexbox-container">
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
            </div> */}
            <div style={{ height: "400px" }}>
                <div className="pt-5" style={{ color: "white" }}>
                    <MyStockList />
                </div>
            </div>
            <br />
      stock news here
        </div>
    );
}
