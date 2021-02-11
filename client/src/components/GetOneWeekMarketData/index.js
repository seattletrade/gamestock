import GetFakeDate from '../GetFakeDate';

export default function GetOneWeekMarketData(oneWeekStockState, increaseFAKETime) {
    console.log("Inside GetOneWeekMarketData function")
    console.log(oneWeekStockState)

    if (oneWeekStockState === undefined) {
        console.log("Pass - Undefined in GetIntraDayMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        console.log(dataProcessing(oneWeekStockState, increaseFAKETime));
        return (dataProcessing(oneWeekStockState, increaseFAKETime));
    }

    // Manage data to use it with Graph
    function dataProcessing(oneWeekStockState, increaseFAKETime) {

        let increasorFAKETime = increaseFAKETime;
        let currentXAxis = [];
        let currentCloseValue = [];
        let currentHighValue = [];
        let currentLowValue = [];
        let currentOpenValue = [];
        let currentVolumeValue = [];

        let aDayTomiliSec = 86400000;

        const fakeDate = GetFakeDate();

        for (let date in oneWeekStockState["Time Series (60min)"]) {
            if (Date.parse(fakeDate) - (aDayTomiliSec * 8) < Date.parse(date) && Date.parse(date)) {
                currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
            }


            if (Date.parse(fakeDate) - (aDayTomiliSec * 8) < Date.parse(date) && Date.parse(date) < Date.parse(fakeDate) - aDayTomiliSec) {
                // console.log(date[11] + date[12]);
                if (date[11] + date[12] === "05" || date[11] + date[12] === "06" || date[11] + date[12] === "19" || date[11] + date[12] === "20") {
                    console.log("Pass the data")
                } else {
                    // Fake Date -> Change Previous day to Today
                    // console.log(typeof (new Date(Date.parse(date) + aDayTomiliSec)));
                    // currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
                    // currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
                    
                    currentOpenValue.unshift(oneWeekStockState["Time Series (60min)"][date]['1. open']);
                    currentHighValue.unshift(oneWeekStockState["Time Series (60min)"][date]['2. high']);
                    currentLowValue.unshift(oneWeekStockState["Time Series (60min)"][date]['3. low']);
                    currentCloseValue.unshift(oneWeekStockState["Time Series (60min)"][date]['4. close']);
                    currentVolumeValue.unshift(oneWeekStockState["Time Series (60min)"][date]['5. volume']);
                }
            }
        }


        const oneWeekMarketData = {
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

        return oneWeekMarketData;

    }

}
