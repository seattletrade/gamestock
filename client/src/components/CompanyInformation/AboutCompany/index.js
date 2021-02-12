import React from 'react'
import { Row, Col, Accordion, Card, Table } from 'react-bootstrap';
import './style.scss';

import NumberComma from '../../NumberComma';

export default function AboutCompany(promps) {
    console.log(promps)

    let headQuartersAddress = promps.companyInfo.Address.split(",")
    console.log("headQuartersAddress");
    console.log(headQuartersAddress);
    return (
        <div className="aboutCompany">

            <h4>About {promps.companyInfo.Name}</h4>
            <hr />
            <Accordion defaultActiveKey="1">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <span className="companyDescription">{promps.companyInfo.Description}</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="full-description">{promps.companyInfo.Description}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <hr />
            <Row>
                <Col className="aboutCompany-title">
                    Headquarters
                </Col>
                <Col className="text-right">
                    {`${headQuartersAddress[1]}, ${headQuartersAddress[2]} ${promps.companyInfo.Country}`}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className="aboutCompany-title">
                    Employees
                </Col>
                <Col className="text-right">
                    {NumberComma(promps.companyInfo.FullTimeEmployees)}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className="aboutCompany-title">
                    Industry
                </Col>
                <Col className="text-right">
                    {promps.companyInfo.Industry}
                </Col>
            </Row>


        </div>
    )
}
