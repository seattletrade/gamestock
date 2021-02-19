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
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="Marketplace for the trade of securities, commodities, derivatives, and other financial instruments">Exchange</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {promps.companyInfo["Exchange"]}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>A unique series of letters assigned to a security for trading purposes, also called a ticker</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="A unique series of letters assigned to a security for trading purposes, also called a ticker">Symbol</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {promps.companyInfo["Symbol"]}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>A stock price average over the last 50 days</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="A stock price average over the last 50 days">50_Moving</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["50DayMovingAverage"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>A stock price average over the last 200 days</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="A stock price average over the last 200 days">200_Moving</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["200DayMovingAverage"]).toFixed(2)}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>An analyst's projection of a security's future price</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="An analyst's projection of a security's future price">Target</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["AnalystTargetPrice"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The total dollar market value of a company's outstanding shares of stock</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="The total dollar market value of a company's outstanding shares of stock">Mkt Cap</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {resultMktCap}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The highest market price of a given security over a 52-week (one year) period</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="The highest market price of a given security over a 52-week (one year) period">52 Wk High</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["52WeekHigh"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The price-earnings ratio relates a company's share price to its earnings per share</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="he price-earnings ratio relates a company's share price to its earnings per share">P/E Ratio</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["PERatio"]).toFixed(2)}
                    </Col>
                </Row>
                <hr className="myHr" />

                <Row>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>The lowest market price of a given security over a 52-week (one year) period</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="The lowest market price of a given security over a 52-week (one year) period">52 Wk Low</a></OverlayTrigger>
                    </Col>
                    <Col className="text-right statsCompany-contents">
                        {parseFloat(promps.companyInfo["52WeekLow"]).toFixed(2)}
                    </Col>
                    <Col className="statsCompany-title">
                        <OverlayTrigger placement="top" overlay={<Tooltip>How much a company pays out in dividends each year relative to its stock price, expressed as a percentage</Tooltip>}>
                            <a href="#" className="tooltiplink" data-toggle="tooltip" title="How much a company pays out in dividends each year relative to its stock price, expressed as a percentage">Div/Yield</a></OverlayTrigger>
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
