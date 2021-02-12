import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import API from '../../utils/API'

// Company STATS / ERNINGS / ABOUT COMPANY
export default function CompanyInformation() {
    console.log("Inside CompanyInformation component")

    // Store Company info
    const [companyInfo, setCompanyInfo] = useState();

    useEffect(() => {

        // TODO: Get the data from a User when they click a company from Search PAGE
        let userInput = {
            "symbol": 'MSFT',
            "companyName": 'Microsoft'
        }

        // Call Company Info data
        getCompanyInfoData(userInput.symbol);
    }, [])

    // API_getCompnayInfoDATA
    function getCompanyInfoData(symbol) {
        // console.log("Start CompanyInfoData API")
        API.getCompanyInfoData(symbol)
            .then(res => {
                console.log("End CompanyInfoData API")
                console.log(res.data)
                setCompanyInfo(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div style={{marginBottom:"50px"}}>
            <h1>TEST</h1>
            <p>{companyInfo.Name}</p>
        </div>
    )
}
