import React, { useState, useEffect, useContext } from "react";
import Plot from 'react-plotly.js';


export default function ChartUser(props) {
    // console.log("In ChartUserInfo")
    const [ propsState, setPropsState ] = useState(); 
    // console.log(props)
    // if(propsState !== props){
    //     setPropsState(props)
    // }
    // useEffect(() => {
    // }, [propsState])
    return (
        <Plot
            data={[
                {
                    x: props.totalInvestmentState.x,
                    y: props.totalInvestmentState.close,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: props.totalInvestmentState.color,
                },
            ]}

            layout={{
                dragmode: 'zoom',
                margin: {
                    l: 0,
                    r: 0,
                    b: 35,
                    t: 0
                },
                xaxis: {
                    range: [props.totalInvestmentState.x[0], props.totalInvestmentState.x[props.totalInvestmentState.x.length-1]],
                    rangeslider: {
                        visible: false
                    },
                    type: 'date',
                    // type: props.type,
                    // visible: props.visible,
                    tickmode: 'array',
                    // fixedrange: true,
                    // autorange: "reversed"

                },
                yaxis: {
                    visible: false
                },
                font: {
                    family: "Raleway",
                    color: "#fff"
                },
                width: 375,
                height: 200,
                paper_bgcolor: "#000",
                plot_bgcolor: "#000",
            }}
            config={{ displayModeBar: false }}
        />
    )
}
