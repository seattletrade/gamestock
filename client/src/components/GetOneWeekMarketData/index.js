export default function GetOneWeekMarketData(oneWeekStockState) {
    console.log("Inside GetOneWeekMarketData function")
    console.log(oneWeekStockState)


    let currentXAxis = [];
    let currentCloseValue = [];
    let currentHighValue = [];
    let currentLowValue = [];
    let currentOpenValue = [];
    let currentVolumeValue = [];

    let aDayTomiliSec = 86400000;

    for (let date in oneWeekStockState["Time Series (60min)"]) {
        if (new Date() - (aDayTomiliSec * 7) < Date.parse(date) && Date.parse(date) < new Date() - aDayTomiliSec) {
            // console.log(date[11] + date[12]);
            if (date[11] + date[12] === "05" || date[11] + date[12] === "06" || date[11] + date[12] === "19" || date[11] + date[12] === "20") {
                console.log("Pass the data")
            } else {
                // Fake Date -> Change Previous day to Today
                // console.log(typeof (new Date(Date.parse(date) + aDayTomiliSec)));
                currentXAxis.push((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));

                currentOpenValue.push(oneWeekStockState["Time Series (60min)"][date]['1. open']);
                currentHighValue.push(oneWeekStockState["Time Series (60min)"][date]['2. high']);
                currentLowValue.push(oneWeekStockState["Time Series (60min)"][date]['3. low']);
                currentCloseValue.push(oneWeekStockState["Time Series (60min)"][date]['4. close']);
                currentVolumeValue.push(oneWeekStockState["Time Series (60min)"][date]['5. volume']);
            }
        }
    }


    const oneWeekMarketData = {
        "setTraceState": {
            x: currentXAxis,
            close: currentCloseValue,
            high: currentHighValue,
            low: currentLowValue,
            open: currentOpenValue,
            increasing: { line: { color: 'blue' }, fillcolor: 'blue' },
            decreasing: { line: { color: 'red' }, fillcolor: 'red' },
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            name: '',
        },
        "setVolume": {
            x: currentXAxis,
            y: currentVolumeValue,
            yaxis: 'y2',
            type: 'bar',
            name: 'Volume',
            marker: {
                color: 'rgba(100,255,255,0.3)',
            }
        }, 
        "range" : [currentXAxis[currentXAxis.length -1 ], currentXAxis[0]]
    }

    return oneWeekMarketData;

}
