<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import AnimatedNumber from "animated-number-react";

import API from '../utils/API'
import ChartCompanyInfo from '../components/ChartCompanyInfo'

import { GetIntraDayMarketDataForFirstGraph, GetIntraDayMarketData } from '../components/GetIntraDayMarketData'
import GetOneWeekMarketData from '../components/GetOneWeekMarketData'
import GetDailyMarketData from '../components/GetDailyMarketData'
=======
import React from 'react'
import Search from "../components/Search";
>>>>>>> dev

export default function Infopage() {

    const [loading, setLoading] = useState(true);
    const [ticker, setTicker] = useState();
    const [companyNameState, setCompanyNameState] = useState();
    const [rangeState, setRangeState] = useState();

    const [oneDayStockState, setOneDayStockState] = useState();

    // Store Market data from API
    const [intraDayStockState, setIntraDayStockState] = useState();
    const [oneWeekStockState, setOneWeekStockState] = useState();
    const [totalDailyStockState, setTotalDailyStockState] = useState();

    // Button Style state
    const btnWithOutline = "btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2";
    const [button1DState, setButton1DState] = useState("btn btn-primary btn-sm pt-0 pb-0 pl-2 pr-2");
    const [button1WState, setButton1WState] = useState(btnWithOutline);
    const [button1MState, setButton1MState] = useState(btnWithOutline);
    const [button3MState, setButton3MState] = useState(btnWithOutline);
    const [button1YState, setButton1YState] = useState(btnWithOutline);
    const [button5YState, setButton5YState] = useState(btnWithOutline);

    //Graph Data state
    const [traceState, setTraceState] = useState({
        x: ['myChartXState'],
        close: ['myCloseState'],
        high: ['myHighState'],
        low: ['myLowState'],
        open: ['myOpenState'],
        increasing: { line: { color: 'blue' }, fillcolor: 'blue' },
        decreasing: { line: { color: 'red' }, fillcolor: 'red' },

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y',
        name: '',
    });
    const [volumeState, setVolume] = useState({
        x: ['myChartXState'],
        y: ['myVolumeState'],
        yaxis: 'y2',
        type: 'bar',
        name: 'Volume',
        marker: {
            color: 'rgba(100,255,255,0.3)',
        }
    });

    // CurrentValueState
    const [currentValueState, setCurrentValueState] = useState();
    const [operatorForCurrentValue, setOperatorForCurrentValue] = useState("+");


    // Fetch Martke Data from API (Alpha Vantage) 
    function GetMarketData(userInput) {
        // Add .env file root in client
        const API_KEY = process.env.REACT_APP_API_KEY;

        let symbol = userInput.symbol;
        let companyName = userInput.companyName;

        setCompanyNameState(companyName);

        const API_ONEDAY_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=${API_KEY}`;
        const API_ONEWEEK_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`;
        const API_DAILY_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;

        // Call IntraDay market data
        IntraDayMarketDATACall(API_ONEDAY_Call)
        // // Call Oneweek market data
        // OneWeekMarketDATACall(API_ONEWEEK_Call)
        // // Call Total Daily market data
        // TotalDailyMarketDATACall(API_DAILY_Call)
    }

    // Display first Graph
    useEffect(() => {
        console.log("First")

        // TODO: Get the data from a User when they click a company from Search PAGE
        let userInput = {
            "symbol": 'MSFT',
            "companyName": 'Microsoft'
        }

        setCompanyNameState(userInput["companyName"]);

        // Store Market Data(IntraDay(15min / 60min), Daily(20years)) to STATE
        GetMarketData(userInput);

        // GetIntraDayMarketData after Processing
        GetIntraDayMarketData(intraDayStockState);




        // // Add .env file root in client
        // const API_KEY = process.env.REACT_APP_API_KEY;

        // let symbol = 'MSFT';
        // let companyName = 'Microsoft';

        

        // const API_ONEDAY_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=${API_KEY}`;
        // const API_ONEWEEK_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`;
        // const API_DAILY_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;


        // // Call Oneweek market data
        // OneWeekMarketDATACall(API_ONEWEEK_Call)
        // // Call Total Daily market data
        // // TotalDailyMarketDATACall(API_DAILY_Call)

        // let xAxis = [];
        // let closeValue = [];
        // let highValue = [];
        // let lowValue = [];
        // let openValue = [];
        // let volumeValue = [];

        // let currentXAxis = [];
        // let currentCloseValue = [];
        // let currentHighValue = [];
        // let currentLowValue = [];
        // let currentOpenValue = [];
        // let currentVolumeValue = [];

        // // 86400000 sec (= 1 day )
        // let aDayTomiliSec = 86400000;

        // API.getStockMarketData(API_ONEDAY_Call)
        //     .then((res) => {
        //         console.log(res.data);
        //         setOneDayStockState(res.data);
        //         setLoading(false);
        //         setTicker(res.data["Meta Data"]["2. Symbol"])
        //         for (let date in res.data["Time Series (15min)"]) {
        //             // console.log(Date.parse(date));
        //             // console.log(Date.now());
        //             // console.log(new Date(Date.parse(date)).getDate())
        //             // console.log(new Date().getDate())


        //             // Get a day Data for graph later
        //             if (new Date(Date.parse(date)).getDate() === new Date().getDate() - 1) {

        //                 // Fake Date -> Change Previous day to Today
        //                 xAxis.push((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));

        //                 openValue.push(res.data["Time Series (15min)"][date]['1. open']);
        //                 highValue.push(res.data["Time Series (15min)"][date]['2. high']);
        //                 lowValue.push(res.data["Time Series (15min)"][date]['3. low']);
        //                 closeValue.push(res.data["Time Series (15min)"][date]['4. close']);
        //                 volumeValue.push(res.data["Time Series (15min)"][date]['5. volume']);
        //             }

        //             // get Current data for Graph
        //             if (new Date(Date.parse(date)).getDate() === new Date().getDate() - 1 &&
        //                 Date.parse(date) < (new Date() - aDayTomiliSec)) {
        //                 // console.log(date);
        //                 // Fake Date -> Change Previous day to Today
        //                 currentXAxis.push((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));

        //                 currentOpenValue.push(res.data["Time Series (15min)"][date]['1. open']);
        //                 currentHighValue.push(res.data["Time Series (15min)"][date]['2. high']);
        //                 currentLowValue.push(res.data["Time Series (15min)"][date]['3. low']);
        //                 currentCloseValue.push(res.data["Time Series (15min)"][date]['4. close']);
        //                 currentVolumeValue.push(res.data["Time Series (15min)"][date]['5. volume']);
        //             }

        //         }

        //         xAxis.splice(0, 5); // remove 18:30:00 ~ 20:00:00
        //         xAxis.splice(45, 9); // remove 04:15:00 ~ 7:00:00
        //         closeValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
        //         closeValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
        //         highValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
        //         highValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
        //         lowValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
        //         lowValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
        //         openValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
        //         openValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
        //         volumeValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
        //         volumeValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00

        //         // console.log(currentXAxis);

        //         setOneDayStockState({
        //             "Time Series (15min)": {
        //                 xAxis: xAxis,
        //                 close: closeValue,
        //                 high: highValue,
        //                 low: lowValue,
        //                 open: openValue,
        //                 volume: volumeValue
        //             }
        //         })

        //         setRangeState([xAxis[xAxis.length - 1], xAxis[0]]);
        //         console.log("currentXAxis[xAxis.length - 1] + currentXAxis[0]");
        //         console.log(xAxis[xAxis.length - 1] + xAxis[0]);
        //         //Set Graph data
        //         setTraceState({
        //             x: xAxis,
        //             close: currentCloseValue,
        //             high: currentHighValue,
        //             low: currentLowValue,
        //             open: currentOpenValue,
        //             increasing: { line: { color: 'blue' }, fillcolor: 'blue' },
        //             decreasing: { line: { color: 'red' }, fillcolor: 'red' },

        //             type: 'candlestick',
        //             xaxis: 'x',
        //             yaxis: 'y',
        //             name: '',
        //         })

        //         setVolume({
        //             x: xAxis,
        //             y: currentVolumeValue,
        //             yaxis: 'y2',
        //             type: 'bar',
        //             name: 'Volume',
        //             marker: {
        //                 color: 'rgba(100,255,255,0.3)',
        //             }
        //         })
        //         console.log(currentCloseValue);
        //         setCurrentValueState(currentCloseValue[0])
        //         console.log("Latest currentCloseValue");
        //         console.log(currentCloseValue);

        //     }).catch(err => { console.log(err); setLoading(false); })
    }, [])

    // // Display Real-time Market data
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         let currentXAxis = [];
    //         let currentCloseValue = [];
    //         let currentHighValue = [];
    //         let currentLowValue = [];
    //         let currentOpenValue = [];
    //         let currentVolumeValue = [];

    //         console.log("IN second useEffect currentValueState");
    //         console.log(currentValueState);
    //         let tempCurrentValueCloseOpenDifferent = [];
    //         let openValue = 0;
    //         if (oneDayStockState === undefined) {
    //             console.log("Pass first implement for Second useEffect")
    //         } else {
    //             console.log("Implement Second useEffect")
    //             console.log(oneDayStockState);
    //             // console.log(oneDayStockState["Time Series (15min)"]["xAxis"]);
    //             for (let index in oneDayStockState["Time Series (15min)"]["xAxis"]) {

    //                 // Calculate Current Value
    //                 if (Date.parse(oneDayStockState["Time Series (15min)"]["xAxis"][index]) > (new Date())) {
    //                     // console.log(oneDayStockState["Time Series (15min)"]["close"][index])
    //                     openValue = oneDayStockState["Time Series (15min)"]["open"][index]
    //                     tempCurrentValueCloseOpenDifferent.push(oneDayStockState["Time Series (15min)"]["close"][index] - oneDayStockState["Time Series (15min)"]["open"][index]);

    //                     // console.log(index)
    //                 };

    //                 // Refresh Chart with latest data
    //                 if (Date.parse(oneDayStockState["Time Series (15min)"]["xAxis"][index]) < (new Date())) {
    //                     currentXAxis.push(oneDayStockState["Time Series (15min)"]["xAxis"][index])
    //                     currentCloseValue.push(oneDayStockState["Time Series (15min)"]["close"][index])
    //                     currentHighValue.push(oneDayStockState["Time Series (15min)"]["high"][index])
    //                     currentLowValue.push(oneDayStockState["Time Series (15min)"]["low"][index])
    //                     currentOpenValue.push(oneDayStockState["Time Series (15min)"]["open"][index])
    //                     currentVolumeValue.push(oneDayStockState["Time Series (15min)"]["volume"][index])
    //                 }
    //             }


    //             //Refresh the Graph data every 5sec
    //             setTraceState({
    //                 x: currentXAxis,
    //                 close: currentCloseValue,
    //                 high: currentHighValue,
    //                 low: currentLowValue,
    //                 open: currentOpenValue,
    //                 increasing: { line: { color: 'blue' }, fillcolor: 'blue' },
    //                 decreasing: { line: { color: 'red' }, fillcolor: 'red' },

    //                 type: 'candlestick',
    //                 xaxis: 'x',
    //                 yaxis: 'y',
    //                 name: '',
    //             })

    //             setVolume({
    //                 x: currentXAxis,
    //                 y: currentVolumeValue,
    //                 yaxis: 'y2',
    //                 type: 'bar',
    //                 name: 'Volume',
    //                 marker: {
    //                     color: 'rgba(100,255,255,0.3)',
    //                 }
    //             })
    //         }

    //         console.log("openValue");
    //         console.log(openValue);

    //         // Live current Value
    //         if (currentValueState === undefined) {
    //             if (openValue === 0) {
    //                 console.log("pass for first implement second useEffect")
    //             } else {
    //                 console.log("pass for undefined currentValueState")
    //                 setCurrentValueState(openValue)
    //             }
    //         } else {
    //             console.log("currentValueState");
    //             console.log(currentValueState);
    //             let openCloseDifference = tempCurrentValueCloseOpenDifferent[tempCurrentValueCloseOpenDifferent.length - 1];
    //             console.log(tempCurrentValueCloseOpenDifferent[tempCurrentValueCloseOpenDifferent.length - 1] / 180.0);
    //             if (operatorForCurrentValue === "+") {
    //                 setCurrentValueState(parseFloat(currentValueState) + parseFloat(openCloseDifference / 180.0) + openCloseDifference)
    //                 setOperatorForCurrentValue("-")
    //             } else {
    //                 setCurrentValueState(parseFloat(currentValueState) + parseFloat(openCloseDifference / 180.0) - openCloseDifference)
    //                 setOperatorForCurrentValue("+")
    //             }
    //         }
    //     }, 5000)
    //     return () => clearInterval(intervalId);
    // }, [currentValueState])


    // API_ONEWEEK_Call

    function IntraDayMarketDATACall(API_ONEDAY_Call) {
        API.getStockMarketData(API_ONEDAY_Call)
            .then(res => {
                // setLoading(false)
                setLoading(false)
                console.log("IntraDay MARKET DATA - check")
                console.log(res.data)
                const { setTraceStateIntraDay, setVolumeIntraDay, rangeIntraDay } = GetIntraDayMarketDataForFirstGraph(res.data);

                setTraceState(setTraceStateIntraDay);
                setVolume(setVolumeIntraDay);
                setRangeState(rangeIntraDay);
                setIntraDayStockState(res.data);
            })
            .catch(err => console.log(err))
    }

    function OneWeekMarketDATACall(API_ONEWEEK_Call) {
        API.getStockMarketData(API_ONEWEEK_Call)
            .then(res => {
                console.log("ONEWEEK MARKET DATA")
                console.log(res.data)
                setOneWeekStockState(res.data)
            })
            .catch(err => console.log(err))
    }

    // API_TotalDailyMArketData_Call
    function TotalDailyMarketDATACall(API_ONEWEEK_Call) {
        API.getStockMarketData(API_ONEWEEK_Call)
            .then(res => {
                console.log("setTotalDailyStockState")
                console.log(res.data)
                setTotalDailyStockState(res.data)
            })
            .catch(err => console.log(err))
    }

    function myFetch(e) {
        const btnWithOutline = "btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2";
        const btnWithoutOutline = "btn btn-primary btn-sm pt-0 pb-0 pl-2 pr-2";

        // console.log(e.target.innerText)

        switch (e.target.innerText) {
            case "1D": {
                setButton1DState(btnWithoutOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)

                break;
            }
            case "1W": {
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithoutOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)

                console.log(oneWeekStockState);
                setTraceState(GetOneWeekMarketData(oneWeekStockState)["setTraceState"]);
                setVolume(GetOneWeekMarketData(oneWeekStockState)["setVolume"]);
                setRangeState(GetOneWeekMarketData(oneWeekStockState)["range"])

                break;
            }
            case "1M": {
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithoutOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)
                break;
            }
            case "3M": {
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithoutOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)
                break;
            }
            case "1Y": {
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithoutOutline)
                setButton5YState(btnWithOutline)
                break;
            }
            case "5Y": {
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithoutOutline)
                break;
            }
        }

    }

    return (
<<<<<<< HEAD
        <>
            {loading ? (<div>Loding...</div>) : (

                <div style={{ background: "black", height: "1000px" }}>
                    <div className="pl-3 pt-5 mt-5" style={{ color: "white" }}>
                        <p style={{ fontSize: "14px", marginBottom: "0" }}>{ticker}</p>
                        <h3>{companyNameState}</h3>
                        <h3>$<AnimatedNumber value={parseFloat(currentValueState).toFixed(2)}
                            formatValue={n => n.toFixed(2)} /></h3>
                    </div>

                    <ChartCompanyInfo traceState={traceState} volumeState={volumeState} range={rangeState} />

                    <Row>
                        <Col className="ml-2 mr-0 pr-0">
                            <button onClick={myFetch} className={button1DState}>1D</button>
                        </Col>
                        <Col className="m-0 p-0">
                            <button onClick={myFetch} className={button1WState}>1W</button>
                        </Col>
                        <Col className="m-0 p-0">
                            <button onClick={myFetch} className={button1MState}>1M</button>
                        </Col>
                        <Col className="m-0 p-0">
                            <button onClick={myFetch} className={button3MState}>3M</button>
                        </Col>
                        <Col className="m-0 p-0">
                            <button onClick={myFetch} className={button1YState}>1Y</button>
                        </Col>
                        <Col className="m-0 p-0">
                            <button onClick={myFetch} className={button5YState}>5Y</button>
                        </Col>
                    </Row>
                </div>


            )}
        </>
=======
        <div>
            <Search />
            info
        </div>
>>>>>>> dev
    )
}
