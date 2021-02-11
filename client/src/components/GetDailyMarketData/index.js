import GetFakeDate from '../GetFakeDate';

function GetOneMonthMarketData(totalDailyStockState, increaseFAKETime) {
    console.log("Inside GetOneMonthMarketData function")
    console.log(totalDailyStockState)

    if (totalDailyStockState === undefined) {
        console.log("Pass - Undefined in GetOneMonthMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        console.log(dataProcessing(totalDailyStockState, increaseFAKETime));
        return (dataProcessing(totalDailyStockState, increaseFAKETime));
    }
}



function dataProcessing(totalDailyStockState, increaseFAKETime) {

    let increasorFAKETime = increaseFAKETime;
    let currentXAxis = [];
    let currentCloseValue = [];
    let currentHighValue = [];
    let currentLowValue = [];
    let currentOpenValue = [];
    let currentVolumeValue = [];

    let aDayTomiliSec = 86400000;

    const fakeDate = GetFakeDate();

    for (let date in totalDailyStockState["Time Series (Daily)"]) {
        if (Date.parse(fakeDate) - (aDayTomiliSec * 31) < Date.parse(date) && Date.parse(date)) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
        }

        if (Date.parse(fakeDate) - (aDayTomiliSec * 31) < Date.parse(date) && Date.parse(date) < Date.parse(fakeDate) + increasorFAKETime - aDayTomiliSec) {

            currentOpenValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['1. open']);
            currentHighValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['2. high']);
            currentLowValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['3. low']);
            currentCloseValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['4. close']);
            currentVolumeValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['5. volume']);

        }
    }

    const processedDailyMarketData = {
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
        "type": 'category',
        "visible": false
    }

    return processedDailyMarketData

}


export {
    GetOneMonthMarketData
}