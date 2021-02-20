import React, { useEffect, useState } from 'react'
import API from '../../utils/API'
import { Row, Col } from 'react-bootstrap';


export default function CompanyNews(props) {
    const [companyNews, setCompanyNews] = useState();
    const [propsState, setPropsState] = useState({ "symbol": "" });

    if (propsState["symbol"] !== props["symbol"]) {
        setPropsState(props)
    }

    function callApi(symbol) {
        let newsArr = []
        API.getCompanyNews(symbol)
            .then(res => {
                newsArr = res.data.slice(0, 15);
                console.log(newsArr)
                setCompanyNews(newsArr);
            }
            )
    }

    useEffect(() => {
        if (propsState["symbol"] === undefined) {

        } else {
            callApi(propsState["symbol"]);
        }
    }, [propsState])

    function formatDate(timestamp) {
        const milliseconds = timestamp * 1000
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", { year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        return humanDateFormat
    }

    return (
        <div className="pt-5" style={{ color: "white" }}>
            <h4>Latest News</h4>
            {companyNews ? <div className="newsList">
                {companyNews.map(item => {
                    return (
                        <div key={item.id}>
                            <Row>
                                {item.image ? <div> <img style={{ width: "200px", float: "left" }} src={item.image} /> </div> : <></>}
                                <Col className="col-sm-9">
                                    <a href={item.url} target="_blank"><h5>{item.headline}</h5></a>
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
        </div>
    )
}