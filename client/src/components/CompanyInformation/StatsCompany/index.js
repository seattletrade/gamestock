import React from 'react'
import { Row, Col, Accordion, Card, Table, Button, OverlayTrigger, Tooltip, Overlay } from 'react-bootstrap';
import './style.scss';

export default function StatsCompany(promps) {

    let resultMktCap = calculatingNumberUnit(promps.companyInfo["MarketCapitalization"]);




    function calculatingNumberUnit(rawMktCap) {
        let k = 1000;
        let M = 1000000;
        let B = 1000000000;
        let T = 1000000000000;
        let mktCap = parseFloat(rawMktCap);
        if (mktCap > T) {
            return `${(mktCap / T).toFixed(2)}T`;
        } else if (mktCap > B) {
            return `${(mktCap / B).toFixed(2)}B`;
        } else if (mktCap > M) {
            return `${(mktCap / M).toFixed(2)}M`;
        } else {
            return `${(mktCap / k).toFixed(2)}K`;
        }
    }

    return (
        <div>
            <h4 id="companyStats">Stats</h4>
            <div style={{ marginTop: "25px" }}>
                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Marketplace for the trade of securities, commodities, derivatives, and other financial instruments</Tooltip>}>
                            <Button>Exchange</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {promps.companyInfo["Exchange"]}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>A unique series of letters assigned to a security for trading purposes, also called a ticker</Tooltip>}>
                            <Button>Symbol</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {promps.companyInfo["Symbol"]}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>A stock price average over the last 50 days</Tooltip>}>
                            <Button>50_Moving</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["50DayMovingAverage"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>A stock price average over the last 200 days</Tooltip>}>
                            <Button>200_Moving</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["200DayMovingAverage"]).toFixed(2)}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>An analyst's projection of a security's future price</Tooltip>}>
                            <Button>Target</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["AnalystTargetPrice"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The total dollar market value of a company's outstanding shares of stock</Tooltip>}>
                            <Button>Mkt Cap</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {resultMktCap}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The highest market price of a given security over a 52-week (one year) period</Tooltip>}>
                            <Button>52 Wk High</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["52WeekHigh"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The price-earnings ratio relates a company's share price to its earnings per share</Tooltip>}>
                            <Button>P/E Ratio</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["PERatio"]).toFixed(2)}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The lowest market price of a given security over a 52-week (one year) period</Tooltip>}>
                            <Button>52 Wk Low</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["52WeekLow"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>How much a company pays out in dividends each year relative to its stock price, expressed as a percentage</Tooltip>}>
                            <Button>Div/Yield</Button></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {(parseFloat(promps.companyInfo["DividendYield"]) * 100).toFixed(2)}
                    </Col>
                </Row>
                <hr className="myHr" />

            </div>
        </div>

    )
}
