import React from 'react'
import Plot from 'react-plotly.js';


export default function ChartUser(props) {
    // console.log("In ChartUserInfo")
    // console.log(props.company.graphData)

    return (
        <Plot
            data={[
                {
                    x: props.company.graphData.x,
                    y: props.company.graphData.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: props.company.graphData.marker,
                },
            ]}

            layout={{
                dragmode: 'zoom',
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 0
                },
                xaxis: {
                    // TODO:get range date!!,
                    range: [props.company.graphData.x[0], props.company.graphData.x[props.company.graphData.x.length -1]],
                    rangeslider: {
                        visible: false
                    },
                    type: 'date',
                    // type: props.type,
                    visible: false,
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
                width: 100,
                height: 30,
                paper_bgcolor: "#000",
                plot_bgcolor: "#000",
            }}
            config={{ displayModeBar: false }}
        />
    )
}
