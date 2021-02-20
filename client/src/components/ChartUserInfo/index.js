import React, { useState, useEffect, useContext } from "react";
import ChartUser from './ChartUser';
import { Link, useLocation } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import UserPageAPI from '../../utils/UserPageAPI';
import { useAuth } from '../../contexts/AuthContext';
import FakeCurrentTimeContext from '../../contexts/FakeCurrentTimeContext'


import { GetIntraDayFirstGraphData, GetIntraDayGraphData } from "./GetIntraDayGraphData";
import NumberComma from '../NumberComma'
import API from "../../utils/API";

export default function ChartUserInfo() {
    // Take FakeCurrentTime from App.js by Context
    const currentFakeTime = useContext(FakeCurrentTimeContext);

    const { currentUser } = useAuth();
    const [userBalance, setUserBalance] = useState(0);
    const [totalInvestmentState, setTotalInvestmentState] = useState(0);
    const [totalInvestingMoney, setTotalInvestingMoney] = useState(0);
    const [defferenceOfInvestingMoney, setDefferenceOfInvestingMoney] = useState(0);
    const [percentOfDefferenceOfInvestingMoney, setPercentOfDefferenceOfInvestingMoney] = useState(0);
    const [ isSign, setIsSign ] = useState(true)
    const [stockLists, setStockListsState] = useState(0);
    const [investingStartDay, setInvestingStartDay] = useState("");

    useEffect(() => {
        UserPageAPI.getUserInfo(currentUser.email)
            .then(res => {
                // console.log(res.data);
                setInvestingStartDay(res.data[0].investingStartDay);
                setUserBalance(NumberComma(res.data[0].balance.toFixed(2)));
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        UserPageAPI.getStockList(currentUser.email)
            .then(res => {
                // console.log(res.data);
                calculateTotalInvestment(res.data);
                // call All Market DATA each symbol.
                getMarketData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        // console.log("totalInvestmentState changed")
    }, [totalInvestmentState])


    function calculateTotalInvestment(stockLists) {
        let totalInvestment = 0;
        stockLists.map(stockList => {
            totalInvestment += parseFloat(stockList["amount"]) * parseFloat(stockList["avg_price"]);
        })
        // console.log("totalInvestment");
        // console.log(totalInvestment);
    }

    function myFetch(e) {
        e.preventDefault();
        console.log(e.target.innerText)
    }

    function getMarketData(stockLists) {
        console.log(stockLists);
        if(stockLists.length > 0){
        // Call IntraDay market data
        IntraDayMarketDATACall(stockLists)
        }

    }

    function IntraDayMarketDATACall(stockLists) {
        const stockData = stockLists.map(async stockList => {
            return (
                API.getIntraMarketData(stockList.symbol, "15min")
                    .then(res => {
                        // stockData.push(res.data);
                        // console.log("IntraDayMarketDATACall");
                        return GetIntraDayFirstGraphData(res.data, stockList.amount, currentFakeTime);
                    })
                    .catch(err => console.log(err))
            )
        })

        // Get Market data for all Stocks
        Promise.all(stockData).then(res => {
            // console.log(res)
            let totalStocks = { ...res[0] }
            // let totalStocks = {"close": ["0"]}
            let defferenceWithStartandCurrent = 0;
            // console.log(totalStocks);
            if (res.length > 1) {
                let fistPrice = totalStocks["close"][0]

                for (let i = 0; i < res.length; i++) {
                    if (i === 0) {
                    } else {
                        totalStocks["symbol"] += ", " + res[i]["symbol"];
                    }
                    for (let j = 0; j < res[i]["close"].length; j++) {
                        //         // let tempCurrent = res[i]["close"][j] * res[i]["stockAmount"];
                        if (i === 0) {
                            totalStocks["close"][j] = ((parseFloat(totalStocks["close"][j]) + (parseFloat(res[i]["close"][j]) * res[i]["stockAmount"])) - fistPrice).toFixed(2);
                        } else {
                            totalStocks["close"][j] = (parseFloat(totalStocks["close"][j]) + (parseFloat(res[i]["close"][j]) * res[i]["stockAmount"])).toFixed(2);
                        }

                    }
                    // console.log(fistPrice)
                }

                defferenceWithStartandCurrent = totalStocks["close"][totalStocks - 1] - totalStocks["close"][0]
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: 'blue' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                // console.log(totalStocks);
                let defferenceInvesting = (parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if(defferenceInvesting > 0){
                    setIsSign(true)
                }else{
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)
                
                setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length-1]))
                setTotalInvestmentState(totalStocks);
            } else {
                defferenceWithStartandCurrent = totalStocks["close"][totalStocks - 1] - totalStocks["close"][0]
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: 'blue' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }
                // console.log(totalStocks);
                setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length-1]))
                setTotalInvestmentState(totalStocks);
            }
        });
    }

    return (
        <div style={{ height: "450px", color: "white" }}>
            <div className="pl-3 pt-5">
                <Row>
                    <Col>
                        <h3>Investing</h3>
                    </Col>
                    <Col className="text-right">
                        <Link
                            to="/gamestock/search"
                            className={
                                location.pathname === "/gamestock/search"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            style={{ margin: "auto", padding: "0" }}
                        >
                            <button type="button" style={{ backgroundColor: "#FD0000", color: "white" }} className="btn">search</button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>${totalInvestingMoney}</h4>
                    </Col>
                    <Col className="text-right">
                        <Link
                            to="/gamestock/trade"
                            className={
                                location.pathname === "/gamestock/trade"
                                    ? "nav-link active"
                                    : "nav-link"
                            } style={{ margin: "auto", padding: "0" }}
                        >
                            <button type="button" style={{ backgroundColor: "#FD0000", color: "white" }} className="btn">trade</button>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div className="text-danger ml-3 mt-2" style={{ fontSize: "11px" }}>
                {
                (isSign)?
                (<div style={{color:"blue"}}>&#8593; {defferenceOfInvestingMoney}({percentOfDefferenceOfInvestingMoney}%) Today</div>):
                (<div style={{color:"red"}}>&#8595; {defferenceOfInvestingMoney}({percentOfDefferenceOfInvestingMoney}%) Today</div>)
                }
            </div>
            <div style={{ margin: "0 -15px" }}>{
                (totalInvestmentState)?(<ChartUser totalInvestmentState={totalInvestmentState} />):(<div style={{textAlign:"center", margin:"50px 0"}}><h1>No stocks</h1></div>)
            }
                
            </div>
            <Row>
                <Col className="ml-2 mr-0 pr-0">
                    <button onClick={myFetch} className="btn btn-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1D</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1W</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1M</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >3M</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1Y</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >ALL</button>
                </Col>
            </Row>
            <hr className="myHr" />
            <div style={{ fontSize: "12px" }}>
                <Row>
                    <Col className="pl-4">
                        Balance
                    </Col>
                    <Col className="text-right pr-4">
                        ${userBalance}
                    </Col>
                </Row>
            </div>
            <hr className="myHr" />
        </div>
    )
}
