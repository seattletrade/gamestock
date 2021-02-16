import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from 'react-bootstrap';

import UserPageAPI from '../../utils/UserPageAPI';
import API from '../../utils/API';

import { useAuth } from '../../contexts/AuthContext';
import FakeCurrentTimeContext from '../../contexts/FakeCurrentTimeContext'
import NumberComma from '../NumberComma';

import StockChart from './StockChart';
import stockDataProcessing from './GetMarketDataForStockList';

import "./style.scss";

export default function MyStockList() {
    // Take FakeCurrentTime from App.js by Context
    const currentFakeTime = useContext(FakeCurrentTimeContext);

    //Dummy Data
    const { currentUser } = useAuth();
    const [ myStockLists , setMyStockLists] = useState([
        // {
        //     symbol: "MSFT",
        //     amount: 175,
        //     currentValue: "245.29",
        //     graphData: {
        //         x: ['2021-2-17 09:30:00', '2021-2-17 09:45:00', '2021-2-17 10:00:00', '2021-2-17 10:15:00', '2021-2-17 10:30:00', '2021-2-17 10:45:00', '2021-2-17 11:00:00', '2021-2-17 11:15:00', '2021-2-17 11:30:00', '2021-2-17 11:45:00', '2021-2-17 12:00:00', '2021-2-17 12:15:00', '2021-2-17 12:30:00', '2021-2-17 12:45:00', '2021-2-17 13:00:00', '2021-2-17 13:15:00', '2021-2-17 13:30:00', '2021-2-17 13:45:00', '2021-2-17 14:00:00', '2021-2-17 14:15:00', '2021-2-17 14:30:00', '2021-2-17 14:45:00', '2021-2-17 15:00:00'],
        //         y: [4323.58, 4123.58, 4523.58, 4153.58, 4323.58, 4223.58, 4623.58, 4723.58, 4923.58, 5323.58, 5523.58, 5523.58, 5753.58, 6593.58, 6673.58, 6723.58, 6923.28, 7023.28, 7323.28, 7423.28, 7503.28, 6513.28, 7523.28],
        //         marker: { color : 'blue' }
        //     },
        // },
        // {
        //     symbol: "TSLA",
        //     amount: 10,
        //     currentValue: "817.90",
        //     graphData: {
        //         x: ['2021-2-17 09:30:00', '2021-2-17 09:45:00', '2021-2-17 10:00:00', '2021-2-17 10:15:00', '2021-2-17 10:30:00', '2021-2-17 10:45:00', '2021-2-17 11:00:00', '2021-2-17 11:15:00', '2021-2-17 11:30:00', '2021-2-17 11:45:00', '2021-2-17 12:00:00', '2021-2-17 12:15:00', '2021-2-17 12:30:00', '2021-2-17 12:45:00', '2021-2-17 13:00:00', '2021-2-17 13:15:00', '2021-2-17 13:30:00', '2021-2-17 13:45:00', '2021-2-17 14:00:00', '2021-2-17 14:15:00', '2021-2-17 14:30:00', '2021-2-17 14:45:00', '2021-2-17 15:00:00'],
        //         y: [4323.58, 4123.58, 4223.58, 4153.58, 4323.58, 4223.58, 4623.58, 4723.58, 4923.58, 4523.58, 3523.58, 3523.58, 3753.58, 4593.58, 3673.58, 3723.58, 3923.28, 4023.28, 3323.28, 3423.28, 3503.28, 3513.28, 3523.28],
        //         marker: { color : 'red' }
        //     }
        // },
        // {
        //     symbol: "ORCL",
        //     amount: 7,
        //     currentValue: "63.15",
        //     graphData: {
        //         x: ['2021-2-17 09:30:00', '2021-2-17 09:45:00', '2021-2-17 10:00:00', '2021-2-17 10:15:00', '2021-2-17 10:30:00', '2021-2-17 10:45:00', '2021-2-17 11:00:00', '2021-2-17 11:15:00', '2021-2-17 11:30:00', '2021-2-17 11:45:00', '2021-2-17 12:00:00', '2021-2-17 12:15:00', '2021-2-17 12:30:00', '2021-2-17 12:45:00', '2021-2-17 13:00:00', '2021-2-17 13:15:00', '2021-2-17 13:30:00', '2021-2-17 13:45:00', '2021-2-17 14:00:00', '2021-2-17 14:15:00', '2021-2-17 14:30:00', '2021-2-17 14:45:00', '2021-2-17 15:00:00'],
        //         y: [4323.58, 4123.58, 4223.58, 4153.58, 4323.58, 4223.58, 4623.58, 4723.58, 4923.58, 4323.58, 3523.58, 3523.58, 3753.58, 3593.58, 3673.58, 3723.58, 3923.28, 3023.28, 3323.28, 3423.28, 3503.28, 3513.28, 3523.28],
        //         marker: { color : 'red' }
        //     }
        // },
        // {
        //     symbol: "IBM",
        //     amount: 12,
        //     currentValue: "120.90",
        //     graphData: {
        //         x: ['2021-2-17 09:30:00', '2021-2-17 09:45:00', '2021-2-17 10:00:00', '2021-2-17 10:15:00', '2021-2-17 10:30:00', '2021-2-17 10:45:00', '2021-2-17 11:00:00', '2021-2-17 11:15:00', '2021-2-17 11:30:00', '2021-2-17 11:45:00', '2021-2-17 12:00:00', '2021-2-17 12:15:00', '2021-2-17 12:30:00', '2021-2-17 12:45:00', '2021-2-17 13:00:00', '2021-2-17 13:15:00', '2021-2-17 13:30:00', '2021-2-17 13:45:00', '2021-2-17 14:00:00', '2021-2-17 14:15:00', '2021-2-17 14:30:00', '2021-2-17 14:45:00', '2021-2-17 15:00:00'],
        //         y: [4323.58, 4123.58, 4223.58, 4153.58, 4323.58, 4223.58, 4623.58, 4723.58, 4523.58, 5323.58, 5523.58, 5523.58, 5753.58, 5593.58, 5673.58, 5723.58, 5923.28, 6023.28, 5523.28, 6423.28, 6503.28, 6513.28, 6523.28],
        //         marker: { color : 'blue' }
        //     }
        // },
        // {
        //     symbol: "AMZN",
        //     amount: 125,
        //     currentValue: "3276.50",
        //     graphData: {
        //         x: ['2021-2-17 09:30:00', '2021-2-17 09:45:00', '2021-2-17 10:00:00', '2021-2-17 10:15:00', '2021-2-17 10:30:00', '2021-2-17 10:45:00', '2021-2-17 11:00:00', '2021-2-17 11:15:00', '2021-2-17 11:30:00', '2021-2-17 11:45:00', '2021-2-17 12:00:00', '2021-2-17 12:15:00', '2021-2-17 12:30:00', '2021-2-17 12:45:00', '2021-2-17 13:00:00', '2021-2-17 13:15:00', '2021-2-17 13:30:00', '2021-2-17 13:45:00', '2021-2-17 14:00:00', '2021-2-17 14:15:00', '2021-2-17 14:30:00', '2021-2-17 14:45:00', '2021-2-17 15:00:00'],
        //         y: [4323.58, 4123.58, 4223.58, 4153.58, 4323.58, 4223.58, 4623.58, 4723.58, 4923.58, 4323.58, 4523.58, 4523.58, 4753.58, 4593.58, 4673.58, 4723.58, 4923.28, 5023.28, 4323.28, 4423.28, 4303.28, 4213.28, 4023.28],
        //         marker: { color : 'red' }
        //     }
        // },
        // {
        //     symbol: "AMD",
        //     amount: 55,
        //     currentValue: "93.79",
        //     graphData: {
        //         x: ['2021-2-17 09:30:00', '2021-2-17 09:45:00', '2021-2-17 10:00:00', '2021-2-17 10:15:00', '2021-2-17 10:30:00', '2021-2-17 10:45:00', '2021-2-17 11:00:00', '2021-2-17 11:15:00', '2021-2-17 11:30:00', '2021-2-17 11:45:00', '2021-2-17 12:00:00', '2021-2-17 12:15:00', '2021-2-17 12:30:00', '2021-2-17 12:45:00', '2021-2-17 13:00:00', '2021-2-17 13:15:00', '2021-2-17 13:30:00', '2021-2-17 13:45:00', '2021-2-17 14:00:00', '2021-2-17 14:15:00', '2021-2-17 14:30:00', '2021-2-17 14:45:00', '2021-2-17 15:00:00'],
        //         y: [4323.58, 4123.58, 4223.58, 4153.58, 4323.58, 4223.58, 4623.58, 4723.58, 4923.58, 5323.58, 5523.58, 5523.58, 5753.58, 5593.58, 5673.58, 5723.58, 5923.28, 6023.28, 6323.28, 6223.28, 5950.28, 5913.28, 5523.28],
        //         marker: { color : 'blue' }
        //     }
        // }
    ])

    useEffect(() => {
        let StockArr = []
        let finalData = []
        UserPageAPI.getStockList(currentUser.email)
        .then(stockLists => {
            console.log(stockLists.data);
            StockArr = [...stockLists.data];
            console.log(StockArr);
            stockLists.data.map(stock => {
                API.getIntraMarketData(stock.symbol, "15min")
                    .then(marketData => {
                        console.log(StockArr);
                        //Get Current Value & Graph Data
                        finalData.push(StockArr.filter(stock => {
                            let graphData = stockDataProcessing(marketData.data, currentFakeTime);
                            if(stock["symbol"] === graphData.symbol){
                                stock["graphData"] = graphData
                                return stock
                            }else{
                                return false
                            }
                        })[0])
                        // finalData.push(
                        //     StockArr.reduce(function(result, stock) {
                        //     console.log(stock)
                        //     let graphData = stockDataProcessing(marketData.data, currentFakeTime);
                        //     if(stock["symbol"] === graphData.symbol){
                        //         stock["graphData"] = graphData
                        //         console.log(stock)
                        //         result += stock;
                        //     }
                        //     return result;
                        // })

                        // StockArr.map(stock => {
                        //     // console.log(stock)
                        //     let graphData = stockDataProcessing(marketData.data, currentFakeTime);
                        //     if(stock["symbol"] === graphData.symbol){
                        //         stock["graphData"] = graphData
                        //         console.log(stock)
                        //         return stock
                        //     }else{
                        //         return null;
                        //     }
                        // })
                        // )
                        console.log(finalData);
                        setMyStockLists(finalData);
                    })
                    .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))

    // Put Currten Value with symbols and shares which are from Stock DB to setMyStockLists
        
    }, [])
    return (
        <>
            <h4>Stocks</h4>
            <div className="myStockLists">
                {myStockLists.length ? (

                myStockLists.map(company => {
                    return(<div>
                        <Row>
                            <Col>
                                <Row style={{ margin: "auto" }}>
                                    {company.symbol}
                                </Row>
                                <Row style={{ margin: "auto", color: "grey", fontSize: "10px" }}>
                                    {company.amount} shares
                                </Row>
                            </Col>
                            <Col className="text-center" style={{ margin: "auto" }}>
                                <StockChart company={company} />
                            </Col>
                            <Col className="text-right" style={{ margin: "auto" }}>
                                ${parseFloat((company["graphData"].currentValue)).toFixed(2)}
                            </Col>
                        </Row>
                        <hr className="myHr" />
                    </div>)
                   })
                
                
                ) : (<div style={{color:"white"}}>Loading...</div>)}
            </div>

        </>
    )
}
