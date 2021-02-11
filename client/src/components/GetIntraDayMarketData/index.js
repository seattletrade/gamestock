import GetFakeDate from '../GetFakeDate';

function GetIntraDayMarketDataForFirstGraph(oneDayStockState, increaseFAKETime) {
    // It is inside IntraDayMarketDATACall func on info PAGE
    // console.log("Inside oneDayStockState FOR FIRST GRAPH function")
    // console.log(oneDayStockState)
    console.log(dataProcessing(oneDayStockState, increaseFAKETime));
    return (dataProcessing(oneDayStockState, increaseFAKETime));
}

function GetIntraDayMarketData(oneDayStockState, increaseFAKETime) {
    // It is inside setInterval in useEffect on info PAGE

    // console.log("Inside oneDayStockState function")
    // console.log(oneDayStockState)
    // console.log(increaseFAKETime);
    if (oneDayStockState === undefined) {
        console.log("Pass - Undefined in GetIntraDayMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        // console.log(dataProcessing(oneDayStockState, increaseFAKETime));
        return (dataProcessing(oneDayStockState, increaseFAKETime));
    }

}

// Manage data to use it with Graph
function dataProcessing(oneDayStockState, increaseFAKETime) {
    // console.log("Inside dataProcessing")
    // console.log(oneDayStockState)

    let increasorFAKETime = increaseFAKETime;
    let currentXAxis = [];
    let currentCloseValue = [];
    let currentHighValue = [];
    let currentLowValue = [];
    let currentOpenValue = [];
    let currentVolumeValue = [];

    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    const fakeDate = GetFakeDate();
    // console.log("FAKE DATE")
    // console.log(fakeDate.getDate())
    // console.log(fakeDate);
    // console.log(Date.parse(fakeDate) - aDayTomiliSec);
    // console.log(new Date() - aDayTomiliSec);
    // console.log(increasorFAKETime);

    for (let date in oneDayStockState["Time Series (15min)"]) {

        if (new Date(Date.parse(date)).getDate() === fakeDate.getDate() - 1) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)));
            // currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
        }

        // get Current data for Graph
        if (new Date(Date.parse(date)).getDate() === fakeDate.getDate() - 1 &&
            Date.parse(date) < (Date.parse(fakeDate) + increasorFAKETime - aDayTomiliSec)) {
            currentOpenValue.unshift(oneDayStockState["Time Series (15min)"][date]['1. open']);
            currentHighValue.unshift(oneDayStockState["Time Series (15min)"][date]['2. high']);
            currentLowValue.unshift(oneDayStockState["Time Series (15min)"][date]['3. low']);
            currentCloseValue.unshift(oneDayStockState["Time Series (15min)"][date]['4. close']);
            currentVolumeValue.unshift(oneDayStockState["Time Series (15min)"][date]['5. volume']);
        }
    }

    // console.log(currentXAxis);

    currentXAxis.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentXAxis.splice(45, 9); // remove 04:15:00 ~ 7:00:00
    currentCloseValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentCloseValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
    currentHighValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentHighValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
    currentLowValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentLowValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
    currentOpenValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentOpenValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00
    currentVolumeValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentVolumeValue.splice(45, 9); // remove 04:15:00 ~ 7:00:00

    // console.log(currentXAxis);


    const intraDayMarketData = {
        "setTraceStateIntraDay": {
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
        "setVolumeIntraDay": {
            x: currentXAxis,
            y: currentVolumeValue,
            yaxis: 'y2',
            type: 'bar',
            name: 'Volume',
            marker: {
                color: 'rgba(100,255,255,0.3)',
            }
        },
        "rangeIntraDay": [currentXAxis[0], currentXAxis[currentXAxis.length - 1]],
        "type": 'date',
        "visible": true
    }

    return intraDayMarketData;
}


export {
    GetIntraDayMarketDataForFirstGraph,
    GetIntraDayMarketData
}

