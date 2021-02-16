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

    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    for (let date in stockData["Time Series (15min)"]) {

        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - 1 ) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.push((new Date(Date.parse(date) + aDayTomiliSec)));
            // currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
        }

        // get Current data for Graph
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - 1  &&
            Date.parse(date) < (Date.parse(currentFakeTime) - aDayTomiliSec)) {
                // console.log(date.substring(12, 16))
                if(date.substring(12, 16) === "9:30"){
                    openValueAt930 = stockData["Time Series (15min)"][date]['1. open'];
                }
            currentOpenValue.push(stockData["Time Series (15min)"][date]['1. open']);
        }

    }

    currentXAxis.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentXAxis.splice(45, 54); // remove 04:15:00 ~ 7:00:00
    currentOpenValue.splice(0, 5); // remove 18:30:00 ~ 20:00:00
    currentOpenValue.splice(45, 54); // remove 04:15:00 ~ 7:00:00

    currentValue = currentOpenValue[0];

    // console.log(openValueAt930);
    // console.log(currentValue);

    let marker = ""
    if(currentValue >= openValueAt930){
        marker = "blue"
    }else{
        marker = "red"
    }

    const graphData = {
        symbol: symbol,
        x: currentXAxis,
        y: currentOpenValue,
        currentValue: currentValue,
        marker:{ color : marker },
    }

    return graphData;
}
