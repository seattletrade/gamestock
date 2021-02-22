export default function GetOneYearGraphData(GetOneYearGraphData, stockAmount, currentFakeTime) {
    // console.log(GetOneYearGraphData);

    // console.log(dataProcessing(oneWeekMarketData, stockAmount, currentFakeTime))
    return dataProcessing(GetOneYearGraphData, stockAmount, currentFakeTime)
}


function dataProcessing(GetOneYearGraphData, stockAmount, currentFakeTime) {
    // console.log("dataProcessing");
    // console.log(GetOneYearGraphData);

    let symbol = GetOneYearGraphData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentCloseValue = [];
    let tempXAxis = [];
    let tempCloseValue = 0;

    let days = 1;
    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    // This is for count the for loop.
    let count = 0;

    for (let date in GetOneYearGraphData["Time Series (Daily)"]) {
        count++;
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 365) {
            tempXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 15));
            if (count % 5 === 0){
                // Fake Date -> Change Previous day to Today
                currentXAxis.unshift(`${tempXAxis[0]}~${tempXAxis[tempXAxis.length-1]}`);
                tempXAxis = [];
            }
                
        }

        // get Current data for Graph
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 365 &&
            // Date.parse(currentFakeTime) - fiveHourmiliSec - (aDayTomiliSec * days) < Date.parse(date) &&
            Date.parse(date) < (Date.parse(currentFakeTime) - aDayTomiliSec * days)) {
                tempCloseValue += parseFloat(GetOneYearGraphData["Time Series (Daily)"][date]['4. close']);
                // console.log(tempCloseValue);
                if(count % 5 === 0){
                    currentCloseValue.unshift((tempCloseValue/5).toFixed(2));
                    tempCloseValue = 0;
                }
        }

    }

    return {
        symbol: symbol,
        x: currentXAxis,
        close: currentCloseValue,
        stockAmount: stockAmount
    }


}