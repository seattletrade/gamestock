import React, { useEffect, useState } from 'react'
import API from '../../utils/API'
import { Row, Col } from 'react-bootstrap';


export default function CompanyNews(props) {
    const [companyNews, setCompanyNews] = useState();

    //usestate setup here, to useeffect below
    useEffect(() => {
        let newsArr = []
        API.getCompanyNews(props.symbol)
            .then(res => {
                newsArr = res.data.slice(0, 15);
                console.log(newsArr)
                setCompanyNews(newsArr);
            }
            )
    }, [])

    function formatDate(timestamp) {
        const milliseconds = timestamp * 1000
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", { year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        return humanDateFormat
    }

    return (
        <>
            <h4>Latest News</h4>
            {companyNews ? <div className="newsList">
                {companyNews.map(item => {
                    return (
                        <div key={item.id}>
                            <Row>
                                {item.image ? <Col className="col-sm-2"> <img style={{ width: "200px", float: "left" }} src={item.image} /> </Col> : <></>}
                                <Col className="col-sm-10">
                                    <a href={item.url}><h5>{item.headline}</h5></a>
                                    <sub>{formatDate(item.datetime)}</sub>
                                </Col>
                                <Row>
                                    <Col className="col-sm-8">
                                        {item.summary ? item.summary + "..." : <div></div>}
                                    </Col>
                                </Row>
                            </Row>
                            <hr className="myHr" />
                        </div>
                    )
                })

                }
            </div> : <div>No news to display</div>}
        </>
    )
}