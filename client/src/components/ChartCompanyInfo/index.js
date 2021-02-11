import React from 'react'
import Plot from 'react-plotly.js';


export default function ChartCompanyInfo(props) {
    // console.log("In ChartComponent")
    // console.log(props)

    return (
        <Plot
            data={[props.traceState, props.volumeState]}
            layout={{
                yaxis: { domain: [0.5, 1] },
                legend: { traceorder: 'reversed' },
                yaxis2: { domain: [0, 0.1] },
                dragmode: 'zoom',
                margin: {
                    l: 0,
                    r: 0,
                    b: 35,
                    t: 0
                },
                showlegend: false,
                xaxis: {
                    // TODO:get range date!!,
                    range: props.range,
                    // range: ['2021-02-10 07:46', '2021-02-10 18:10'],
                    rangeslider: {
                        visible: false
                    },
                    // type: 'category',
                    type: props.type,
                    visible: props.visible,
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
                paper_bgcolor: "#000",
                plot_bgcolor: "#000",
                width: 375,
                height: 200,
            }}
            config={{ displayModeBar: false }}
        />
    )
}
