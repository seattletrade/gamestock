import React from 'react'
import { Row, Col, Accordion, Card, Table } from 'react-bootstrap';
import './style.scss';

export default function StatsCompany(promps) {

    let resultMktCap = calculatingNumberUnit(promps.companyInfo["MarketCapitalization"]);




    function calculatingNumberUnit(rawMktCap){
        let k = 1000;
        let M = 1000000;
        let B = 1000000000;
        let T = 1000000000000;
        let mktCap = parseFloat(rawMktCap);
        if(mktCap > T){
            return`${(mktCap/T).toFixed(2)}T`;
        }else if(mktCap > B){
            return`${(mktCap/B).toFixed(2)}B`;
        }else if(mktCap > M){
            return`${(mktCap/M).toFixed(2)}M`;
        }else{
            return`${(mktCap/k).toFixed(2)}K`;
        }
    }

    


    return (
        <div>
            <h4>Stats</h4>
            <div style={{marginTop:"25px"}}>
            <Row>
                <Col className="statsCompany-title">
                Exchange
                </Col>
                <Col className="text-right statsCompany-contents">
                   {promps.companyInfo["Exchange"]}
                </Col>
                <Col className="statsCompany-title">
                Symbol
                </Col>
                <Col className="text-right statsCompany-contents">
                {promps.companyInfo["Symbol"]}
                </Col>
            </Row>
            <hr />

            <Row>
                <Col className="statsCompany-title">
                    50_Moving
                </Col>
                <Col className="text-right statsCompany-contents">
                {parseFloat(promps.companyInfo["50DayMovingAverage"]).toFixed(2)}
                </Col>
                <Col className="statsCompany-title">
                200_Moving
                </Col>
                <Col className="text-right statsCompany-contents">
                {parseFloat(promps.companyInfo["200DayMovingAverage"]).toFixed(2)}
                </Col>
            </Row>
            <hr />

            <Row>
                <Col className="statsCompany-title">
                    Target
                </Col>
                <Col className="text-right statsCompany-contents">
                    {parseFloat(promps.companyInfo["AnalystTargetPrice"]).toFixed(2)}
                </Col>
                <Col className="statsCompany-title">
                    Mkt Cap
                </Col>
                <Col className="text-right statsCompany-contents">
                {resultMktCap}
                </Col>
            </Row>
            <hr />

            <Row>
                <Col className="statsCompany-title">
                    52 Wk High
                </Col>
                <Col className="text-right statsCompany-contents">
                   {parseFloat(promps.companyInfo["52WeekHigh"]).toFixed(2)}
                </Col>
                <Col className="statsCompany-title">
                    P/E Ratio
                </Col>
                <Col className="text-right statsCompany-contents">
                    {parseFloat(promps.companyInfo["PERatio"]).toFixed(2)}
                </Col>
            </Row>
            <hr />

            <Row>
                <Col className="statsCompany-title">
                    52 Wk Low
                </Col>
                <Col className="text-right statsCompany-contents">
                    {parseFloat(promps.companyInfo["52WeekLow"]).toFixed(2)}
                </Col>
                <Col className="statsCompany-title">
                    Div/Yield
                </Col>
                <Col className="text-right statsCompany-contents">
                   {(parseFloat(promps.companyInfo["DividendYield"]) * 100).toFixed(2)}
                </Col>
            </Row>
            <hr />
           
            </div>
        </div>

    )
}
