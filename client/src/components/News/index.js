import React, { useEffect, useState } from 'react'
import API from '../../utils/API'
import { Row, Col } from 'react-bootstrap';


export default function News() {
    const [apiResults, setApiResults] = useState();

    //usestate setup here, to useeffect below
    useEffect(() => {
        let newsArr = []
        let businessArr = []
        API.getNews()
            .then(res => {
                newsArr = res.data;
                // console.log(newsArr);
                businessArr = newsArr.filter((item) => item.category === "business").slice(0, 25);
                // console.log(businessArr);
                setApiResults(businessArr)
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
            <h4>Business News</h4>
            {apiResults ? <div className="newsList">
                {apiResults.map(item => {
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
                                        {item.summary ? item.summary + "..." : <></>}
                                    </Col>
                                </Row>
                            </Row>
                            <hr className="myHr" />
                        </div>
                    )
                })

                }
            </div>
                :
                <div>No news to display</div>}
        </>
    )
}