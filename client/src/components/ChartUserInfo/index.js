import React, { useState, useEffect, useContext } from "react";
import ChartUser from './ChartUser';
import { Link, useLocation } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import UserPageAPI from '../../utils/UserPageAPI';
import { useAuth } from '../../contexts/AuthContext';
import FakeCurrentTimeContext from '../../contexts/FakeCurrentTimeContext'


import { GetIntraDayFirstGraphData, GetIntraDayGraphData } from "./GetIntraDayGraphData";
import GetOneWeekGraphData from './GetOneWeekGraphData';
import GetOneMonthGraphData from './GetOneMonthGraphData';
import GetThreeMonthGraphData from './GetThreeMonthGraphData';
import GetOneYearGraphData from './GetOneYearGraphData';
import GetAllGraphData from './GetAllGraphData';
import NumberComma from '../NumberComma'
import API from "../../utils/API";

export default function ChartUserInfo() {
    // Take FakeCurrentTime from App.js by Context
    const currentFakeTime = useContext(FakeCurrentTimeContext);

    const { currentUser } = useAuth();
    const [userBalance, setUserBalance] = useState(0);
    const [totalInvestmentState, setTotalInvestmentState] = useState(0); // All Market data for Graph
    const [totalInvestingMoney, setTotalInvestingMoney] = useState(0); // Total Investment money + Gain or Loss
    const [totalInvestingMoneyWithoutGainLoss, setTotalInvestingMoneyWithoutGainLoss] = useState(0); // Total Investment money
    const [defferenceOfInvestingMoney, setDefferenceOfInvestingMoney] = useState(0);
    const [percentOfDefferenceOfInvestingMoney, setPercentOfDefferenceOfInvestingMoney] = useState(0);
    const [isSign, setIsSign] = useState(true)
    const [investingStartDay, setInvestingStartDay] = useState("");
    const [stockListState, setStockListState] = useState("");
    const [displayDateState, setDisplayDateState] = useState("Today");
    // const [totalDailyStockState, setTotalDailyStockState] = useState();

    // Button Style state
    const [switchState, setSwitchState] = useState("1D");
    const btnWithOutline = "btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2";
    const [button1DState, setButton1DState] = useState("btn btn-primary btn-sm pt-0 pb-0 pl-2 pr-2");
    const [button1WState, setButton1WState] = useState(btnWithOutline);
    const [button1MState, setButton1MState] = useState(btnWithOutline);
    const [button3MState, setButton3MState] = useState(btnWithOutline);
    const [button1YState, setButton1YState] = useState(btnWithOutline);
    const [buttonAllState, setButtonAllState] = useState(btnWithOutline);

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
                setStockListState(res.data);
                getMarketData(res.data)
                const totalInvestemnt = res.data.map(stock => {
                    // console.log(stock.avg_price  * parseInt(stock.amout))
                    return((parseFloat(stock.avg_price) * stock.amount))
                })
                // console.log(totalInvestemnt);
                let finalTotal = 0;
                totalInvestemnt.forEach(index => {
                    finalTotal += index;
                })
                setTotalInvestingMoneyWithoutGainLoss(finalTotal.toFixed(2))
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        // console.log("totalInvestmentState changed")
    }, [totalInvestmentState]) // All Market data for Graph


    useEffect(() => {
        // console.log("switchState changed")
    }, [switchState])

    function calculateTotalInvestment(stockLists) {
        let totalInvestment = 0;
        stockLists.map(stockList => {
            totalInvestment += parseFloat(stockList["amount"]) * parseFloat(stockList["avg_price"]);
        })
        // console.log("totalInvestment");
        // console.log(totalInvestment);
    }

    function getMarketData(stockLists) {
        // console.log(stockLists);
        if (stockLists.length > 0) {
            // Call IntraDay market data
            IntraDayMarketDATACall(stockLists)
        }

    }

    function IntraDayMarketDATACall(stockLists) {
        setDisplayDateState("Today")

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

                // console.log(totalStocks)
                totalStocks["type"] = "date";
                totalStocks["visible"] = "true";
                // console.log(totalStocks)

                defferenceWithStartandCurrent = totalStocks["close"][totalStocks["close"].length - 1] - totalStocks["close"][0]
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: "red" }
                }

                // console.log(totalStocks);
                let defferenceInvesting = (parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    setTotalInvestingMoney("No Stock Data")
                }
            } else {
                // console.log(totalStocks);
                for(let i = 0; i < totalStocks.close.length; i++){
                    totalStocks.close[i] = (totalStocks.close[i] * totalStocks.stockAmount).toFixed(2);
                }
                // console.log(totalStocks);
                totalStocks["type"] = "date";
                totalStocks["visible"] = "true";

                defferenceWithStartandCurrent = totalStocks["close"][totalStocks["close"].length - 1] - totalStocks["close"][0]
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                let defferenceInvesting = (parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)

                // console.log(totalStocks);
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    setTotalInvestingMoney("No Stock Data")
                }
            }
        });
    }


    function OneWeekMarketDATACall(stockLists, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss) {
        setDisplayDateState("Past Week")
        // console.log(investingStartDay);
        // console.log(totalInvestingMoney);
        const stockData = stockLists.map(async stockList => {
            return (
                API.getIntraMarketData(stockList.symbol, "60min")
                    .then(res => {
                        // stockData.push(res.data);
                        // console.log("OneWeekMarketDATACall");
                        // console.log(res);
                        return GetOneWeekGraphData(res.data, stockList.amount, currentFakeTime, investingStartDay);
                    })
                    .catch(err => console.log(err))
            )
        })

        // Get Market data for all Stocks
        Promise.all(stockData).then(res => {
            // console.log(res)
            let totalStocks = { ...res[0] }
            let defferenceWithStartandCurrent = 0;

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
                // console.log(totalStocks)
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;
                // console.log(totalStocks)
                if (Date.parse(totalStocks.x[0]) < Date.parse(investingStartDay)) {
                    checkStartInvestingDate(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                // totalInvestingMoney is Current TotalInvetingMoney
                // defferenceWithStartandCurrent = totalStocks["close"][totalStocks["close"].length - 1] - totalStocks["close"][0]
                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                // console.log(totalInvestingMoney.replace(",","") - totalStocks["close"][0])
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                // console.log(totalStocks);

                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);
                // let defferenceInvesting = (parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])).toFixed(2);
                // console.log(parseFloat(totalInvestingMoney.replace(",","")))
                // console.log(defferenceInvesting)
                // console.log(parseFloat(totalStocks["close"][0]));
                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                // setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }
            } else {
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;

                for(let i = 0; i < totalStocks.close.length; i++){
                    totalStocks.close[i] = (totalStocks.close[i] * totalStocks.stockAmount).toFixed(2);
                }

                if (Date.parse(totalStocks.x[0]) < Date.parse(investingStartDay)) {
                    checkStartInvestingDate(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                // defferenceWithStartandCurrent = totalStocks["close"][totalStocks["close"].length - 1] - totalStocks["close"][0]
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);
                // let defferenceInvesting = (parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                // setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)

                // console.log(totalStocks);
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }

            }

        })

    }

    function OneMonthMarketDATACall(stockLists, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss) {
        setDisplayDateState("Past Month")

        const stockData = stockLists.map(async stockList => {
            return (
                API.getDailyMarketData(stockList.symbol, "full")
                    .then(res => {
                        // stockData.push(res.data);
                        // console.log("OneWeekMarketDATACall");
                        // console.log(res);
                        return GetOneMonthGraphData(res.data, stockList.amount, currentFakeTime);
                    })
                    .catch(err => console.log(err))
            )
        })

        // Get Market data for all Stocks
        Promise.all(stockData).then(res => {
            // console.log(res)
            let totalStocks = { ...res[0] }
            let defferenceWithStartandCurrent = 0;

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
                // console.log(totalStocks)
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;
                // console.log(totalStocks)
                if (Date.parse(totalStocks.x[0]) < Date.parse(investingStartDay)) {
                    checkStartInvestingDate(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                // totalInvestingMoney is Current TotalInvetingMoney
                // defferenceWithStartandCurrent = totalStocks["close"][totalStocks["close"].length - 1] - totalStocks["close"][0]
                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                // console.log(totalStocks);
                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);
                // let defferenceInvesting = (parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }


                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                // setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }
            } else {
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;

                for(let i = 0; i < totalStocks.close.length; i++){
                    totalStocks.close[i] = (totalStocks.close[i] * totalStocks.stockAmount).toFixed(2);
                }

                if (Date.parse(totalStocks.x[0]) < Date.parse(investingStartDay)) {
                    checkStartInvestingDate(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                // totalInvestingMoney is Current TotalInvetingMoney
                // defferenceWithStartandCurrent = totalStocks["close"][totalStocks["close"].length - 1] - totalStocks["close"][0]
                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);
                // let defferenceInvesting = (parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                // setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalStocks["close"][totalStocks["close"].length - 1]) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)

                // console.log(totalStocks);
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }

            }
        })

    }

    function ThreeMonthMarketDATACall(stockLists, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss) {
        setDisplayDateState("Past 3 Months")

        const stockData = stockLists.map(async stockList => {
            return (
                API.getDailyMarketData(stockList.symbol, "full")
                    .then(res => {
                        // stockData.push(res.data);
                        // console.log("OneWeekMarketDATACall");
                        // console.log(res);
                        return GetThreeMonthGraphData(res.data, stockList.amount, currentFakeTime);
                    })
                    .catch(err => console.log(err))
            )
        })

        // Get Market data for all Stocks
        Promise.all(stockData).then(res => {
            // console.log(res)
            let totalStocks = { ...res[0] }
            let defferenceWithStartandCurrent = 0;

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
                // console.log(totalStocks)
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;
                // console.log(totalStocks)
                if (Date.parse(totalStocks.x[0]) < Date.parse(investingStartDay)) {
                    checkStartInvestingDate(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                // console.log(totalStocks);
                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }
            } else {
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;

                for(let i = 0; i < totalStocks.close.length; i++){
                    totalStocks.close[i] = (totalStocks.close[i] * totalStocks.stockAmount).toFixed(2);
                }

                if (Date.parse(totalStocks.x[0]) < Date.parse(investingStartDay)) {
                    checkStartInvestingDate(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)

                // console.log(totalStocks);
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }

            }
        })

    }

    function OneYearMarketDATACall(stockLists, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss) {
        setDisplayDateState("Past Year")

        const stockData = stockLists.map(async stockList => {
            return (
                API.getDailyMarketData(stockList.symbol, "full")
                    .then(res => {
                        // stockData.push(res.data);
                        // console.log("OneWeekMarketDATACall");
                        // console.log(res);
                        return GetOneYearGraphData(res.data, stockList.amount, currentFakeTime);
                    })
                    .catch(err => console.log(err))
            )
        })

        // Get Market data for all Stocks
        Promise.all(stockData).then(res => {
            // console.log(res)
            let totalStocks = { ...res[0] }
            let defferenceWithStartandCurrent = 0;

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
                // console.log(totalStocks)
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;

                // console.log(totalStocks.x[0].substring(0, 11));
                if (Date.parse(totalStocks.x[0].substring(0, 11)) < Date.parse(investingStartDay)) {
                    // console.log("test");
                    checkStartInvestingDateForOneYear(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                // console.log(totalStocks);
                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }
            } else {
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;


                for(let i = 0; i < totalStocks.close.length; i++){
                    totalStocks.close[i] = (totalStocks.close[i] * totalStocks.stockAmount).toFixed(2);
                }

                // console.log(totalStocks.x[0].substring(0, 11));
                if (Date.parse(totalStocks.x[0].substring(0, 11)) < Date.parse(investingStartDay)) {
                    // console.log("test");
                    checkStartInvestingDateForOneYear(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                }

                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)

                // console.log(totalStocks);
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }

            }
        })

    }

    function AllMarketDATACall(stockLists, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss) {
        setDisplayDateState("All Time")

        const stockData = stockLists.map(async stockList => {
            return (
                API.getDailyMarketData(stockList.symbol, "full")
                    .then(res => {
                        // stockData.push(res.data);
                        // console.log("OneWeekMarketDATACall");
                        // console.log(res);
                        return GetAllGraphData(res.data, stockList.amount, currentFakeTime, investingStartDay);
                    })
                    .catch(err => console.log(err))
            )
        })

        // Get Market data for all Stocks
        Promise.all(stockData).then(res => {
            // console.log(res)
            let totalStocks = { ...res[0] }
            let defferenceWithStartandCurrent = 0;

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
                // console.log(totalStocks)
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;
                // let tempDate = new Date(Date.parse(investingStartDay))
                // console.log(new Date(Date.parse(investingStartDay)).toString().substring(0, 11))
                // console.log(totalInvestingMoneyWithoutGainLoss);
                totalStocks.x.unshift(new Date(Date.parse(investingStartDay)).toString().substring(0, 11))
                totalStocks.close.unshift(totalInvestingMoneyWithoutGainLoss);
                // // console.log(totalStocks.x[0].substring(0, 11));
                // if (Date.parse(totalStocks.x[0].substring(0, 11)) < Date.parse(investingStartDay)) {
                //     // console.log("test");
                //     checkStartInvestingDateForOneYear(totalStocks, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                // }

                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                // console.log(totalStocks);
                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }
            } else {
                totalStocks["type"] = "category";
                totalStocks["visible"] = false;

                for(let i = 0; i < totalStocks.close.length; i++){
                    totalStocks.close[i] = (totalStocks.close[i] * totalStocks.stockAmount).toFixed(2);
                }

                totalStocks.x.unshift(new Date(Date.parse(investingStartDay)).toString().substring(0, 11))
                totalStocks.close.unshift(totalInvestingMoneyWithoutGainLoss);

                defferenceWithStartandCurrent = totalInvestingMoney.replace(",", "") - totalStocks["close"][0]
                totalStocks["close"][totalStocks["close"].length - 1] = totalInvestingMoney.replace(",", "");
                if (defferenceWithStartandCurrent > 0) {
                    totalStocks["color"] = { color: '#00ff00' }
                } else {
                    totalStocks["color"] = { color: 'red' }
                }

                let defferenceInvesting = (parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])).toFixed(2);

                if (defferenceInvesting > 0) {
                    setIsSign(true)
                } else {
                    setIsSign(false)
                }

                setPercentOfDefferenceOfInvestingMoney((((parseFloat(totalInvestingMoney.replace(",", "")) - parseFloat(totalStocks["close"][0])) / parseFloat(totalStocks["close"][0])) * 100).toFixed(2))
                setDefferenceOfInvestingMoney(defferenceInvesting)

                // console.log(totalStocks);
                if (totalStocks.close[totalStocks.close.length - 1] !== undefined) {
                    // setTotalInvestingMoney(NumberComma(totalStocks.close[totalStocks.close.length - 1]))
                    setTotalInvestmentState(totalStocks);
                } else {
                    // setTotalInvestingMoney("No Stock Data")
                }

            }
        })

    }


    function checkStartInvestingDate(totalStocks, investingStartDay, totalInvestingMoney) {
        // console.log(totalInvestingMoney);
        totalStocks.x.forEach((day, index) => {
            if (Date.parse(day) < Date.parse(investingStartDay)) {
                // console.log(day);
                totalStocks["close"][index] = totalInvestingMoney;
            }
        })

        // console.log(totalStocks);
    }

    function checkStartInvestingDateForOneYear(totalStocks, investingStartDay, totalInvestingMoney) {
        // console.log(totalStocks);
        totalStocks.x.forEach((day, index) => {
            // console.log(totalStocks.x.length);
            if (index < totalStocks.x.length - 1) {

                if (Date.parse(day.substring(0, 11)) < Date.parse(investingStartDay)) {
                    // console.log(day.substring(0, 11));
                    totalStocks["close"][index] = totalInvestingMoney;
                }
            }
        })

        // console.log(totalStocks);
    }

    // Function for Changing DATE (1D 1W 1M 3M 1Y ALL)
    function myFetch(e) {
        e.preventDefault();
        const btnWithOutline = "btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2";
        const btnWithoutOutline = "btn btn-primary btn-sm pt-0 pb-0 pl-2 pr-2";

        switch (e.target.innerText) {
            case "1D": {
                setSwitchState("1D")
                setButton1DState(btnWithoutOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButtonAllState(btnWithOutline)
                IntraDayMarketDATACall(stockListState)
                break;
            }
            case "1W": {
                setSwitchState("1W")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithoutOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButtonAllState(btnWithOutline)
                OneWeekMarketDATACall(stockListState, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss)
                break;
            }
            case "1M": {
                setSwitchState("1M")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithoutOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButtonAllState(btnWithOutline)
                OneMonthMarketDATACall(stockListState, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss)
                break;
            }
            case "3M": {
                setSwitchState("3M")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithoutOutline)
                setButton1YState(btnWithOutline)
                setButtonAllState(btnWithOutline)
                ThreeMonthMarketDATACall(stockListState, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss)
                break;
            }
            case "1Y": {
                setSwitchState("1Y")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithoutOutline)
                setButtonAllState(btnWithOutline)
                OneYearMarketDATACall(stockListState, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                break;
            }
            case "ALL": {
                setSwitchState("ALL")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButtonAllState(btnWithoutOutline)
                AllMarketDATACall(stockListState, totalInvestingMoney, investingStartDay, totalInvestingMoneyWithoutGainLoss);
                break;
            }
        }

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
                    (isSign) ?
                        (<div style={{ color: "#00ff00" }}>&#8593; {defferenceOfInvestingMoney}({percentOfDefferenceOfInvestingMoney}%) {displayDateState}</div>) :
                        (<div style={{ color: "red" }}>&#8595; {defferenceOfInvestingMoney}({percentOfDefferenceOfInvestingMoney}%) {displayDateState}</div>)
                }
            </div>
            <div style={{ margin: "0 -15px" }}>{
                (totalInvestmentState) ? (<ChartUser totalInvestmentState={totalInvestmentState} />) : (<div style={{ textAlign: "center", margin: "50px 0" }}><h1>No Stock Data</h1></div>)
            }

            </div>
            <Row>
                <Col className="ml-2 mr-0 pr-0">
                    <button onClick={myFetch} className={button1DState} >1D</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className={button1WState} >1W</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className={button1MState} >1M</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className={button3MState} >3M</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className={button1YState} >1Y</button>
                </Col>
                <Col className="m-0 p-0">
                    <button onClick={myFetch} className={buttonAllState} >ALL</button>
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
