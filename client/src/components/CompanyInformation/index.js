import React, { useState, useEffect } from "react";
import API from '../../utils/API'

import AboutCompany from './AboutCompany';

// Company STATS / ERNINGS / ABOUT COMPANY
export default function CompanyInformation() {
    console.log("Inside CompanyInformation component")

    // Store Company info
    const [loading, setLoading] = useState(true);
    const [companyInfo, setCompanyInfo] = useState();

    useEffect(() => {

        // TODO: Get the data from a User when they click a company from Search PAGE
        let userInput = {
            "symbol": 'MSFT',
            "companyName": 'Microsoft'
        }

        // Call API MARKET DATA and COMPANY INFO
        CallAPIDATA(userInput.symbol);

    }, [])


    // CALL API MARKET DATA and COMPANY INFO
    function CallAPIDATA(symbol) {
        // API_getCompnayInfoDATA
        getCompanyInfoData(symbol)

    }

    function getCompanyInfoData(symbol) {
        API.getCompanyInfoData(symbol)
            .then(res => {
                console.log(res.data)
                setCompanyInfo(res.data);
                setLoading(false)
            })
            .catch(err => {console.log(err); setLoading(false);});
    }

    return (
        <>
        {loading ? (<div></div>) : (
        <div style={{ marginBottom: "50px" }}>
            <AboutCompany companyInfo = {companyInfo} />
        </div>)}
        </>
    )
}
