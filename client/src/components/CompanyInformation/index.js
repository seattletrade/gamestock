import React, { useState, useEffect } from "react";
import API from '../../utils/API'

import StatsCompany from './StatsCompany';
import AboutCompany from './AboutCompany';


// Company STATS / ERNINGS / ABOUT COMPANY
export default function CompanyInformation(promps) {
    // console.log("Inside CompanyInformation component")
    // Store Company info
    const [loading, setLoading] = useState(true);
    const [companyInfo, setCompanyInfo] = useState();

    useEffect(() => {
        console.log(promps);
        // TODO: Get the data from a User when they click a company from Search PAGE
        let userInput = promps; 

        // Call API MARKET DATA and COMPANY INFO
        CallAPIDATA(userInput.symbol);

    }, [])


    // CALL API MARKET DATA and COMPANY INFO
    function CallAPIDATA(symbol) {
        API.getCompanyInfoData(symbol)
            .then(res => {
                setCompanyInfo(res.data);
                setLoading(false)
            })
            .catch(err => {console.log(err); setLoading(false);});
    }

    return (
        <>
        {loading ? (<div></div>) : (
        <div style={{ margin: "50px 0" }}>
            <div>
            <StatsCompany companyInfo = {companyInfo} />
            </div>
            <div>
            <AboutCompany companyInfo = {companyInfo} />
            </div>
        </div>)}
        </>
    )
}
