export default function stockDataProcessing(stockData, currentFakeTime) {
    // console.log(stockData);
    // console.log(dataProcessing(stockData, currentFakeTime));
    return dataProcessing(stockData, currentFakeTime);
}

function dataProcessing(stockData, currentFakeTime) {

    let symbol = stockData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentOpenValue = [];
    let openValueAt930 = 0;
    let currentValue = 0;
    let days = 1;
    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;
    let fiveHourmiliSec = 18000000;
    // console.log(currentFakeTime);
    for (let date in stockData["Time Series (15min)"]) {
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - days) {
            if (date.substring(11, 16) === "04:15" || date.substring(11, 16) === "04:30" ||
                date.substring(11, 16) === "04:45" || date.substring(11, 16) === "05:00" || date.substring(11, 16) === "05:15" ||
                date.substring(11, 16) === "05:30" || date.substring(11, 16) === "05:45" || date.substring(11, 16) === "06:00" ||
                date.substring(11, 16) === "06:15" || date.substring(11, 16) === "06:30" || date.substring(11, 16) === "06:45" ||
                date.substring(11, 16) === "07:00" || date.substring(11, 16) === "07:15" || date.substring(11, 16) === "07:30" ||
                date.substring(11, 16) === "07:45" || date.substring(11, 16) === "08:00" || date.substring(11, 16) === "08:15" ||
                date.substring(11, 16) === "08:30" || date.substring(11, 16) === "08:45" || date.substring(11, 16) === "09:00"
            ) {
                // console.log("Pass Too early data")
            } else {

                // Fake Date -> Change Previous day to Today
                currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)));
                // currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
            }
        }

        // get Current data for Graph
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - days &&
            Date.parse(date) < Date.parse(currentFakeTime) - aDayTomiliSec * days) {
            if (date.substring(11, 16) === "04:15" || date.substring(11, 16) === "04:30" ||
                date.substring(11, 16) === "04:45" || date.substring(11, 16) === "05:00" || date.substring(11, 16) === "05:15" ||
                date.substring(11, 16) === "05:30" || date.substring(11, 16) === "05:45" || date.substring(11, 16) === "06:00" ||
                date.substring(11, 16) === "06:15" || date.substring(11, 16) === "06:30" || date.substring(11, 16) === "06:45" ||
                date.substring(11, 16) === "07:00" || date.substring(11, 16) === "07:15" || date.substring(11, 16) === "07:30" ||
                date.substring(11, 16) === "07:45" || date.substring(11, 16) === "08:00" || date.substring(11, 16) === "08:15" ||
                date.substring(11, 16) === "08:30" || date.substring(11, 16) === "08:45" || date.substring(11, 16) === "09:00"
            ) {
                // console.log("Pass Too early data")
            } else {
                // console.log(date.substring(12, 16))
                if (date.substring(12, 16) === "9:30") {
                    openValueAt930 = stockData["Time Series (15min)"][date]['1. open'];
                }
                currentOpenValue.unshift(stockData["Time Series (15min)"][date]['1. open']);
            }
        }
    }

    currentValue = currentOpenValue[currentOpenValue.length - 1];

    // console.log(openValueAt930);
    // console.log(currentValue);

    let marker = ""
    if (currentValue >= openValueAt930) {
        marker = "#00ff00"
    } else {
        marker = "red"
    }

    const graphData = {
        symbol: symbol,
        x: currentXAxis,
        y: currentOpenValue,
        currentValue: currentValue,
        marker: { color: marker },
    }

    return graphData;
}
