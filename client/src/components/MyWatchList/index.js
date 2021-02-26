import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from 'react-bootstrap';

import UserPageAPI from '../../utils/UserPageAPI';
import API from '../../utils/API';

import { useAuth } from '../../contexts/AuthContext';
import FakeCurrentTimeContext from '../../contexts/FakeCurrentTimeContext'
import NumberComma from '../NumberComma';

import StockChart from './StockChart';
import stockDataProcessing from './GetMarketDataForWatchList';
import { useHistory } from "react-router-dom";


import "./style.scss";



export default function MyWatchList() {
    // Take FakeCurrentTime from App.js by Context
    const currentFakeTime = useContext(FakeCurrentTimeContext);

    const { currentUser } = useAuth();
    const history = useHistory()
    const [ myWatchLists , setMyWatchLists] = useState([])   

    function loadWatchList(){
        let WatchArr = []
        let finalData = []
        API.getAllOnWatchList(currentUser.email)
        .then(watchLists => {
        //    console.log(watchLists.data)
            if(watchLists.data.length){
                WatchArr = [...watchLists.data]; 
                for(let i = 0; i < WatchArr.length; i++) {
                    // console.log("each stock array", StockArr[i])
                    API.getCurrentPrice(WatchArr[i].symbol)
                    // .then(data => console.log(data.data["Global Quote"]["05. price"]))
                    .then(data => WatchArr[i].price = data.data["Global Quote"]["05. price"])
                }          
                watchLists.data.map(stock => {
                    API.getIntraMarketData(stock.symbol, "15min")
                        .then(marketData => {
                            // console.log(StockArr);
                            // console.log(marketData);
                            //Get Current Value & Graph Data
                            finalData.push(WatchArr.filter(stock => {
                                let graphData = stockDataProcessing(marketData.data, currentFakeTime);
                                if(stock["symbol"] === graphData.symbol){
                                    stock["graphData"] = graphData
                                    return stock
                                }else{
                                    return false
                                }
                            })[0])
                            // console.log(finalData);
                            setMyWatchLists(finalData);
                        })
                        .catch(err => console.log(err))
                })
            } else {
                setMyWatchLists([])
            }

        })
        .catch(err => console.log(err))       
    }

    function handleDelete(email, symbol){
        // console.log(watchList);
        API.deleteOneOnWatchList(email, symbol)
        .then((res) => loadWatchList())
        .catch(err => console.log(err)); 
        // history.push("/gamestock/user")       
    }

    useEffect(() => {
        loadWatchList()        
    }, [])
    
    useEffect(() => {        
        
    }, [myWatchLists])

    return (
        <>
            <h4>Watch Lists</h4>
            <div className="myWatchLists">
                {myWatchLists.length ? (

                myWatchLists.map(company => {
                    
                    return(
                    <div key={company.symbol}>
                        <Row>
                            <Col>
                                <Row style={{ margin: "auto" }}>
                                    {company.symbol}
                                </Row>
                                <Row style={{ margin: "auto", color: "grey", fontSize: "10px" }}>
                                    {company.companyName} 
                                </Row>
                            </Col>
                            <Col className="text-center" style={{ margin: "auto" }}>
                                <StockChart company={company} />
                            </Col>
                            <Col className="text-right" style={{ margin: "auto" }}>
                                ${parseFloat(company.price).toFixed(2)}
                            </Col>
                            <Col className="text-right" style={{ margin: "auto" }}>
                                <Button onClick={() => handleDelete(currentUser.email, company.symbol)} className="btn btn-sm btn-danger">X</Button>
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
