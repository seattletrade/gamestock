import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';

import StockChart from './StockChart';

import "./style.scss";

export default function MyStockList() {

    //Dummy Data
    const [ returnTest , seReturnTest] = useState()
    const [ myStockLists , setMyStockLists] = useState([
        {
            symbol: "GOOG",
            companyName: "Alphabet Class C",
            currentValue: "2,106.00"
        },
        {
            symbol: "GOOGL",
            companyName: "Alphabet Class A",
            currentValue: "2,087.96"
        },
        {
            symbol: "INTC",
            companyName: "Intel",
            currentValue: "62.00"
        },
    ])
    return (
        <>
            <h4>Watch Lists</h4>
            <div className="myStockLists">
                {myStockLists.map(company => {
                    return(<div>
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
                                <StockChart />
                            </Col>
                            <Col className="text-right" style={{ margin: "auto" }}>
                                ${company.currentValue}
                            </Col>
                        </Row>
                        <hr className="myHr" />
                    </div>)
                   })}
            </div>

        </>
    )
}
