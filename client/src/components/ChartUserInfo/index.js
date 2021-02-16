import React, { useState, useEffect, useContext } from "react";
import ChartUser from './ChartUser';
import { Link, useLocation } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import UserPageAPI from '../../utils/UserPageAPI';
import { useAuth } from '../../contexts/AuthContext';

import NumberComma from '../NumberComma'

export default function ChartUserInfo() {

    const { currentUser } = useAuth();
    const [ userBalance, setUserBalance ] = useState(0);

    useEffect(() => {
        UserPageAPI.getUserInfo(currentUser.email)
        .then(res => {
            setUserBalance(NumberComma(res.data[0].balance));
        })
        .catch(err => console.log(err))
    }, [])

    function myFetch(e) {
        e.preventDefault();
        console.log(e.target.innerText)
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
                        >
                            search
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>$6,523.28</h4>
                    </Col>
                    <Col className="text-right">
                        <Link
                            to="/gamestock/trade"
                            className={
                                location.pathname === "/gamestock/trade"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            trade
                        </Link>
                    </Col>
                </Row>
            </div>
            <div className="text-primary ml-3 mt-2" style={{ fontSize: "11px" }}>
                &#8593; $88.51(1.20%) Today
            </div>
            <div style={{ margin: "0 -15px" }}>
                <ChartUser />
            </div>
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
