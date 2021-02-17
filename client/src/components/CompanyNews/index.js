import React, { useEffect, useState } from 'react'
import API from '../../utils/API'
import { Row, Col } from 'react-bootstrap';


export default function CompanyNews(props) {
    const [companyNews, setCompanyNews] = useState();

    //usestate setup here, to useeffect below
    useEffect(() => {
        // let newsArr = []
        // let businessArr = []
        API.getCompanyNews(props.symbol)
            .then(res => {
                console.log(res)
                setCompanyNews(res)
                // newsArr = res.data;
                // console.log(newsArr);
                // businessArr = newsArr.filter((item) => item.category === "business");
                // console.log(businessArr);
                // setApiResults(businessArr)
            }
            )
    }, [])

    // function formatDate(timestamp) {
    //     const milliseconds = timestamp * 1000
    //     const dateObject = new Date(milliseconds)
    //     const humanDateFormat = dateObject.toLocaleString("en-US", { year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    //     return humanDateFormat
    // }

    return (
        <>
            <h4>Latest News</h4>
            {companyNews ? <p>this is the news</p> : <div>No news to display</div>}
        </>
    )
}