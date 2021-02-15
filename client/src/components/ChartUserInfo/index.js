import React from 'react'
import ChartUser from './ChartUser';

import { Row, Col } from 'react-bootstrap';

export default function ChartUserInfo() {
    function myFetch(e){
        e.preventDefault();
        console.log(e.target.innerText)
    }

    return (
        <div style={{ background: "black", height: "400px" }}>
            <div className="pl-3 pt-5" style={{ color: "white" }}>
                <h3>Investing</h3>
                <h4>$6,523.28</h4>
            </div>
            <div className="text-primary ml-3 mt-3" style={{ fontSize:"12px" }}>
            &#8593; $88.51(1.20%) Today
            </div>
            <div style={{ margin: "0 -15px" }}>
                <ChartUser />

                <Row>
                    <Col className="ml-2 mr-0 pr-0">
                        <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1D</button>
                    </Col>
                    <Col className="m-0 p-0">
                        <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1W</button>
                    </Col>
                    <Col className="m-0 p-0">
                        <button onClick={myFetch} className="btn btn-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1M</button>
                    </Col>
                    <Col className="m-0 p-0">
                        <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >3M</button>
                    </Col>
                    <Col className="m-0 p-0">
                        <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >1Y</button>
                    </Col>
                    <Col className="m-0 p-0">
                        <button onClick={myFetch} className="btn btn-outline-primary btn-sm pt-0 pb-0 pl-2 pr-2" >5Y</button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
