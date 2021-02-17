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
    const [ myStockLists , setMyStockLists] = useState([])

    useEffect(() => {
        let StockArr = []
        let finalData = []
        UserPageAPI.getStockList(currentUser.email)
        .then(stockLists => {
            // console.log(stockLists.data);
            StockArr = [...stockLists.data];
            // console.log(StockArr);
            stockLists.data.map(stock => {
                API.getIntraMarketData(stock.symbol, "15min")
                    .then(marketData => {
                        // console.log(StockArr);
                        // console.log(marketData);
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
                        // console.log(finalData);
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
