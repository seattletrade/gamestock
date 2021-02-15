import React from 'react'
import Plot from 'react-plotly.js';


export default function ChartUser(props) {
    // console.log("In ChartUserInfo")
    // console.log(props)

    return (
        <Plot
            data={[
                {
                    x: ['2021-1-25', '2021-1-26', '2021-1-27','2021-1-28','2021-1-29','2021-1-30','2021-1-31','2021-2-1','2021-2-2','2021-2-3','2021-2-4','2021-2-5', '2021-2-6', '2021-2-7', '2021-2-8', '2021-2-9', '2021-2-10', '2021-2-11', '2021-2-12', '2021-2-13', '2021-2-14', '2021-2-15'],
                    y: [4323.58, 4123.58, 4223.58, 4153.58, 4323.58, 4223.58, 4623.58, 4723.58, 4923.58, 5323.58, 5523.58, 5523.58, 5753.58, 5593.58, 5673.58, 5723.58, 5923.28, 6023.28, 6323.28, 6423.28, 6503.28, 6513.28, 6523.28],
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'red' },
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
                    // range: [2020, 2021],
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
