import GetFakeDate from '../GetFakeDate';

// ONE MONTH STOCK DATA
function GetOneMonthMarketData(totalDailyStockState, increaseFAKETime) {
    // console.log("Inside GetOneMonthMarketData function")
    // console.log(totalDailyStockState)

    if (totalDailyStockState === undefined) {
        console.log("Pass - Undefined in GetOneMonthMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        // console.log(dataProcessing(totalDailyStockState, increaseFAKETime, 31));
        return (dataProcessing(totalDailyStockState, increaseFAKETime, 31));
    }
}

// THREE MONTH STOCK DATA
function GetThreeMonthMarketData(totalDailyStockState, increaseFAKETime) {
    // console.log("Inside GetThreeMonthMarketData function")
    // console.log(totalDailyStockState)

    if (totalDailyStockState === undefined) {
        // console.log("Pass - Undefined in GetThreeMonthMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        // console.log(dataProcessing(totalDailyStockState, increaseFAKETime, 90));
        return (dataProcessing(totalDailyStockState, increaseFAKETime, 90));
    }
}

// ONE YEAR STOCK DATA
function GetOneYearMarketData(totalDailyStockState, increaseFAKETime) {
    // console.log("Inside GetOneYearMarketData function")
    // console.log(totalDailyStockState)

    if (totalDailyStockState === undefined) {
        // console.log("Pass - Undefined in GetOneYearMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        // console.log(dataProcessingForYears(totalDailyStockState, increaseFAKETime, 365, 5));
        return (dataProcessingForYears(totalDailyStockState, increaseFAKETime, 365, 5));
    }
}

// FIVE YEAR STOCK DATA
function GetFiveYearMarketData(totalDailyStockState, increaseFAKETime) {
    // console.log("Inside GetFiveYearMarketData function")
    // console.log(totalDailyStockState)

    if (totalDailyStockState === undefined) {
        console.log("Pass - Undefined in GetFiveYearMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        // console.log(dataProcessingForYears(totalDailyStockState, increaseFAKETime, 1825, 25));
        return (dataProcessingForYears(totalDailyStockState, increaseFAKETime, 1825, 25));
    }
}


function dataProcessing(totalDailyStockState, increaseFAKETime, days) {

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
        if (Date.parse(fakeDate) - (aDayTomiliSec * days) < Date.parse(date) && Date.parse(date)) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
        }

        if (Date.parse(fakeDate) - (aDayTomiliSec * days) < Date.parse(date) && Date.parse(date) < Date.parse(fakeDate) + increasorFAKETime - aDayTomiliSec) {

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



// Data Processing for 1, 5 year
function dataProcessingForYears(totalDailyStockState, increaseFAKETime, days, range) {

    let increasorFAKETime = increaseFAKETime;
    let currentXAxis = [];
    let currentCloseValue = [];
    let currentHighValue = [];
    let currentLowValue = [];
    let currentOpenValue = [];
    let currentVolumeValue = [];

    let tempXAxis = [];
    let tempCloseValue = 0;
    let tempHighValue = 0;
    let tempLowValue = 0;
    let tempOpenValue = 0;
    let tempVolume = 0;

    let aDayTomiliSec = 86400000;

    const fakeDate = GetFakeDate();

    // This is for count the for loop.
    let count = 0;

    for (let date in totalDailyStockState["Time Series (Daily)"]) {
        count++;
        if (Date.parse(fakeDate) - (aDayTomiliSec * days) < Date.parse(date) && Date.parse(date)) {
            tempXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 15));
            if(count % range === 0){
                // Fake Date -> Change Previous day to Today
                currentXAxis.unshift(`${tempXAxis[0]}~${tempXAxis[tempXAxis.length-1]}`);
                tempXAxis = [];
                // currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 15));
            }
        }

        if (Date.parse(fakeDate) - (aDayTomiliSec * days) < Date.parse(date) && Date.parse(date) < Date.parse(fakeDate) + increasorFAKETime - aDayTomiliSec) {
            tempVolume += parseFloat(totalDailyStockState["Time Series (Daily)"][date]['5. volume']);
            tempOpenValue += parseFloat(totalDailyStockState["Time Series (Daily)"][date]['1. open']);
            tempHighValue += parseFloat(totalDailyStockState["Time Series (Daily)"][date]['2. high']);
            tempLowValue += parseFloat(totalDailyStockState["Time Series (Daily)"][date]['3. low']);
            tempCloseValue += parseFloat(totalDailyStockState["Time Series (Daily)"][date]['4. close']);

            if(count % range === 0){
            currentOpenValue.unshift((tempOpenValue/range).toFixed(2));
            currentHighValue.unshift((tempHighValue/range).toFixed(2));
            currentLowValue.unshift((tempLowValue/range).toFixed(2));
            currentCloseValue.unshift((tempCloseValue/range).toFixed(2));
            currentVolumeValue.unshift(tempVolume);

            // Initialize temp value
            tempOpenValue = 0;
            tempLowValue = 0;
            tempHighValue = 0;
            tempCloseValue = 0;
            tempVolume = 0;

            // currentOpenValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['1. open']);
            // currentHighValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['2. high']);
            // currentLowValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['3. low']);
            // currentCloseValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['4. close']);
            // currentVolumeValue.unshift(totalDailyStockState["Time Series (Daily)"][date]['5. volume']);
            }

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
    GetOneMonthMarketData,
    GetThreeMonthMarketData,
    GetOneYearMarketData,
    GetFiveYearMarketData
}