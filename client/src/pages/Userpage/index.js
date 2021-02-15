import React from "react";
import { Link, useLocation } from "react-router-dom";
import ChartUserInfo from "../../components/ChartUserInfo"
import MyStockList from "../../components/MyStockList"
import MyWatchLists from "../../components/MyWatchLists"
import "./style.scss";

export default function Userpage() {
    return (
        <div>
            <ChartUserInfo />

            <div>
                <div className="pt-5" style={{ color: "white" }}>
                    <MyStockList />
                </div>
                <div className="pt-5" style={{ color: "white" }}>
                    <MyWatchLists />
                </div>
            </div>
        </div>
    );
}
