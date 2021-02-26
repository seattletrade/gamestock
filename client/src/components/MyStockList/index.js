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

    const { currentUser } = useAuth();
    const [ myStockLists , setMyStockLists] = useState([])

    useEffect(() => {
        let StockArr = []
        let finalData = []
        UserPageAPI.getStockList(currentUser.email)
        .then(stockLists => {
            // console.log("stock lists", stockLists.data[0].symbol);
            
            StockArr = [...stockLists.data];
            // console.log("stosk Array", StockArr)
            for(let i = 0; i < StockArr.length; i++) {
                // console.log("each stock array", StockArr[i])
                API.getCurrentPrice(StockArr[i].symbol)
                // .then(data => console.log(data.data["Global Quote"]["05. price"]))
                .then(data => StockArr[i].price = data.data["Global Quote"]["05. price"])
            }
            // console.log("new stock array", StockArr)
            stockLists.data.map(stock => {
                API.getIntraMarketData(stock.symbol, "15min")
                    .then(marketData => {
                        // console.log(StockArr);
                        // console.log("market Data", marketData);
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

    useEffect(() => {
                
    }, [myStockLists])
    
    return (
        <>
            <h4>Stocks</h4>
           {/* {console.log(myStockLists)} */}
            <div className="myStockLists">
                {myStockLists.length ? (
                    
                myStockLists.map(company => {                   
                    return(
                    <div key={company.symbol}>
                        {/* {console.log(company)} */}
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
                            <Col className="text-right " style={{ margin: "auto" }}>
                                <Row className="justify-content-end" style={{ margin: "auto" }}>
                                    {parseFloat(company.price).toFixed(2)}
                                </Row>
                                {((company.price * company.amount) - (company.avg_price * company.amount)).toFixed(2) >= 0  ? 
                                    <Row className="justify-content-end" style={{ margin: "auto",  fontSize: "10px", color:"#00ff00" }}>
                                        {((company.price * company.amount) - (company.avg_price * company.amount)).toFixed(2)}
                                    </Row>
                                    :
                                    <Row className="justify-content-end" style={{ margin: "auto",  fontSize: "10px", color:"red" }}>
                                        {((company.price * company.amount) - (company.avg_price * company.amount)).toFixed(2)}
                                    </Row>
                                }                                
                            </Col>
                        </Row>
                        <hr className="myHr" />
                    </div>
                    )
                   })
                
                
                ) : (<div style={{color:"white"}}>Loading...</div>)}
            </div>

        </>
    )
}
