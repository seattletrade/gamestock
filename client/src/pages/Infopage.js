import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import AnimatedNumber from "animated-number-react";

import API from '../utils/API'

export default function Infopage() {

    const [loading, setLoading] = useState(true);
    const [ticker, setTicker] = useState();
    const [companyNameState, setCompanyNameState] = useState();

    // Button Style state
    const btnWithOutline = "btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2";
    const [button1DState, setButton1DState] = useState(btnWithOutline);
    const [button1WState, setButton1WState] = useState(btnWithOutline);
    const [button1MState, setButton1MState] = useState(btnWithOutline);
    const [button3MState, setButton3MState] = useState(btnWithOutline);
    const [button1YState, setButton1YState] = useState(btnWithOutline);
    const [button5YState, setButton5YState] = useState(btnWithOutline);

    useEffect(() => {
        // Add .env file root in client
        const API_KEY = process.env.REACT_APP_API_KEY;
        let symbol = 'MSFT';
        let companyName = 'Microsoft';
        // let stockAPIfunc = 'TIME_SERIES_INTRADAY';
        // let outputSize = 'outputsize=full';

        setCompanyNameState(companyName);

        // const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`;
        const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

        let xAxis = [];
        let closeValue = [];
        let highValue = [];
        let lowValue = [];
        let openValue = [];
        let volumeValue = [];
        // 86400000 sec (= 1 day )
        let aDayTomiliSec = 86400000;
        // 1 day per 1
        let days = 30;

        API.getStockMarketData(API_Call)
            .then((res) => {
                console.log(res.data);
                setLoading(false);
                setTicker(res.data["Meta Data"]["2. Symbol"])
                for (let date in res.data["Time Series (Daily)"]) {
                    // console.log(Date.parse(date));
                    // console.log(Date.now());
                    if (Date.parse(date) > (Date.now() - (aDayTomiliSec * days))) {
                        xAxis.push(date);

                        openValue.push(res.data["Time Series (Daily)"][date]['1. open']);
                        highValue.push(res.data["Time Series (Daily)"][date]['2. high']);
                        lowValue.push(res.data["Time Series (Daily)"][date]['3. low']);
                        closeValue.push(res.data["Time Series (Daily)"][date]['4. close']);
                        volumeValue.push(res.data["Time Series (Daily)"][date]['5. volume']);
                    }
                }

                console.log(xAxis);
                console.log(openValue);
                console.log(highValue);
                console.log(lowValue);
                console.log(closeValue);
                console.log(volumeValue);



            }).catch(err => { console.log(err); setLoading(false); })

    }, [])

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
        <>
            {loading ? (<div>Loding...</div>) : (

                <div style={{ background: "black", height: "1000px" }}>
                    <div className="pl-3 pt-5 mt-5" style={{ color: "white" }}>
                        <p style={{ fontSize: "14px", marginBottom: "0" }}>{ticker}</p>
                        <h3>{companyNameState}</h3>
                        <h3>$<AnimatedNumber value={245.55298.toFixed(2)} formatValue={n => n.toFixed(2)} /></h3>
                        {/* <h3>${parseFloat(currentValueState).toFixed(2)} </h3> */}
                    </div>
                    {/* <Plot
                        data={[traceState, volumeState]}
                        layout={{
                            yaxis: { domain: [0.5, 1] },
                            legend: { traceorder: 'reversed' },
                            yaxis2: { domain: [0, 0.1] },
                            dragmode: 'zoom',
                            margin: {
                                l: 0,
                                r: 0,
                                b: 30,
                                t: 0
                            },
                            showlegend: false,
                            xaxis: {
                                // autorange: false,
                                // rangemode: "nonnegative",
                                range: [],
                                rangeslider: {
                                    visible: false
                                },
                                type: 'date',
                                tickmode: 'array',
                                // fixedrange: true,
                                // visible: false

                            },
                            yaxis: {
                                visible: false
                            },
                            font: {
                                family: "Raleway",
                                color: "#fff"
                            },
                            paper_bgcolor: "#000",
                            plot_bgcolor: "#000",
                            width: 375,
                            height: 200,
                        }}
                        config={{ displayModeBar: false }}
                    /> */}
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
