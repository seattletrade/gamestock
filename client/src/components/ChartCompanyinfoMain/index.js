import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import AnimatedNumber from "animated-number-react";

import API from '../../utils/API'
import ChartCompanyInfo from '../ChartCompanyInfo'

import { GetIntraDayMarketDataForFirstGraph, GetIntraDayMarketData } from '../GetIntraDayMarketData'
import GetOneWeekMarketData from '../GetOneWeekMarketData'
import GetDailyMarketData from '../GetDailyMarketData'
import GetCurrentValueForLive from '../GetCurrentValueForLive'
import { set } from "mongoose";

export default function Infopage() {

    // Increase FAKE Time state
    const [increaseFAKETime, setIncreaseFAKETime] = useState(0);
    const [switchState, setSwitchState] = useState("1D");

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
    const [typeState, useTypeState] = useState('date');
    const [visibleState, useVisibleState] = useState('true');
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
        OneWeekMarketDATACall(API_ONEWEEK_Call)
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
        setTicker(userInput["symbol"])

        // Store Market Data(IntraDay(15min / 60min), Daily(20years)) to STATE
        GetMarketData(userInput);

    }, [])

    // Display Real-time Market data
    useEffect(() => {
        // Update Graph every 5 sec
        const intervalId = setInterval(() => {
            // console.log("Interval")
            setIncreaseFAKETime(increaseFAKETime + 5000); // 15min - 900000 / 5sec 5000

            // Graph Data
            let graphDate = {}

            // Display Realtime Value
            let afterFifteenMinDifference = GetCurrentValueForLive(intraDayStockState, increaseFAKETime);

            // Swich Statment - 1D , 1W , 1M , 3M , 1Y , 5Y
            // console.log("switchState");
            // console.log(switchState);
            switch (switchState) {
                case "1D":
                    console.log("switchState 1D");
                    graphDate = GetIntraDayMarketData(intraDayStockState, increaseFAKETime);
                    break;
                case "1W":
                    console.log("switchState 1W");
                    graphDate = GetOneWeekMarketData(oneWeekStockState, increaseFAKETime);
                    break;
                case "1M":
                    console.log("switchState 1M");
                    break;
                case "3M":
                    console.log("switchState 3M");
                    break;
                case "1Y":
                    console.log("switchState 1Y");
                    break;
                case "5Y":
                    console.log("switchState 5Y");
                    break;
            }
            
            
            // console.log("After Swtich")
            // console.log(graphDate);
            // const { setTraceStateIntraDay, setVolumeIntraDay, rangeIntraDay } = GetIntraDayMarketData(intraDayStockState, increaseFAKETime);
            // console.log("traceStateIntraDay in Interval");
            // console.log(setTraceStateIntraDay);

            if (graphDate.setTraceStateIntraDay["null"] === "") {
                console.log("Pass - Undefined from GetIntraDayMarketData Func on InfoPAGE")
            }
            else {
                // console.log('Check else in Interval ');
                useTypeState(graphDate.typeState);
                useVisibleState(graphDate.visible);
                setTraceState(graphDate.setTraceStateIntraDay);
                setVolume(graphDate.setVolumeIntraDay);
                setRangeState(graphDate.rangeIntraDay);

                if (operatorForCurrentValue === "+") {
                    setCurrentValueState(parseFloat(currentValueState) + parseFloat(afterFifteenMinDifference / 180) + afterFifteenMinDifference);
                    setOperatorForCurrentValue("-");
                    // console.log("+")
                } else {
                    setCurrentValueState(parseFloat(currentValueState) + parseFloat(afterFifteenMinDifference / 180) - afterFifteenMinDifference);
                    setOperatorForCurrentValue("+")
                    // console.log("-")
                }

            }

        }, 5000)

        return () => clearInterval(intervalId);
    }, [increaseFAKETime, switchState])

    // Call IntraDay market data
    function IntraDayMarketDATACall(API_ONEDAY_Call) {
        API.getStockMarketData(API_ONEDAY_Call)
            .then(res => {
                // setLoading(false)
                setLoading(false)
                console.log("IntraDay MARKET DATA - check")
                console.log(res.data)
                const { setTraceStateIntraDay, setVolumeIntraDay, rangeIntraDay } = GetIntraDayMarketDataForFirstGraph(res.data, 0);
                // console.log(setTraceStateIntraDay);
                setTraceState(setTraceStateIntraDay);
                setVolume(setVolumeIntraDay);
                setRangeState(rangeIntraDay);
                setIntraDayStockState(res.data);
                setCurrentValueState(setTraceStateIntraDay["close"][setTraceStateIntraDay["close"].length - 1]);
            })
            .catch(err => console.log(err))
    }

    // Call OneWeekMarket market data (INTRADATE 60 MIN)
    function OneWeekMarketDATACall(API_ONEWEEK_Call) {
        API.getStockMarketData(API_ONEWEEK_Call)
            .then(res => {
                console.log("ONEWEEK MARKET DATA")
                console.log(res.data)
                setOneWeekStockState(res.data)
            })
            .catch(err => console.log(err))
    }

    // API_TotalDailyMArketData_Call(Fullsize-20years)
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
                setSwitchState("1D")
                setButton1DState(btnWithoutOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)
                const { setTraceStateIntraDay, setVolumeIntraDay, rangeIntraDay,  type, visible } = GetIntraDayMarketData(intraDayStockState, increaseFAKETime)
                useTypeState(type);
                useVisibleState(visible);
                setTraceState(setTraceStateIntraDay);
                setVolume(setVolumeIntraDay);
                setRangeState(rangeIntraDay);
                break;
            }
            case "1W": {
                setSwitchState("1W")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithoutOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)
                const { setTraceStateIntraDay, setVolumeIntraDay, rangeIntraDay,  type, visible } = GetOneWeekMarketData(oneWeekStockState, increaseFAKETime);
                useTypeState(type);
                useVisibleState(visible);
                setTraceState(setTraceStateIntraDay);
                setVolume(setVolumeIntraDay);
                setRangeState(rangeIntraDay);
               break;
            }
            case "1M": {
                setSwitchState("1M")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithoutOutline)
                setButton3MState(btnWithOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)

                break;
            }
            case "3M": {
                setSwitchState("3M")
                setButton1DState(btnWithOutline)
                setButton1WState(btnWithOutline)
                setButton1MState(btnWithOutline)
                setButton3MState(btnWithoutOutline)
                setButton1YState(btnWithOutline)
                setButton5YState(btnWithOutline)
                break;
            }
            case "1Y": {
                setSwitchState("1Y")
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
                setSwitchState("5Y")
                break;
            }
        }

    }

    return (

        <>
            {loading ? (<div>Loding...</div>) : (

                <div style={{ background: "black", height: "1000px" }}>
                    <div className="pl-3 pt-5 mt-5" style={{ color: "white" }}>
                        <p style={{ fontSize: "14px", marginBottom: "0" }}>{ticker}</p>
                        <h3>{companyNameState}</h3>
                        <h3>$<AnimatedNumber value={parseFloat(currentValueState).toFixed(2)}
                            formatValue={n => n.toFixed(2)} /></h3>
                    </div>

                    <ChartCompanyInfo traceState={traceState} volumeState={volumeState} range={rangeState} typeState={typeState} visible={visibleState}/>

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
    )
}
