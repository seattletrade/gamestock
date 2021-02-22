export default function GetOneMonthGraphData(threeMonthMarketData, stockAmount, currentFakeTime) {
    console.log(threeMonthMarketData);

    // console.log(dataProcessing(oneWeekMarketData, stockAmount, currentFakeTime))
    return dataProcessing(threeMonthMarketData, stockAmount, currentFakeTime)
}


function dataProcessing(threeMonthMarketData, stockAmount, currentFakeTime) {
    // console.log("dataProcessing");
    // console.log(threeMonthMarketData);

    let symbol = threeMonthMarketData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentCloseValue = [];

    let days = 1;
    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    for (let date in threeMonthMarketData["Time Series (Daily)"]) {
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 90) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
            
        }

        // get Current data for Graph
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 90 &&
            // Date.parse(currentFakeTime) - fiveHourmiliSec - (aDayTomiliSec * days) < Date.parse(date) &&
            Date.parse(date) < (Date.parse(currentFakeTime) - aDayTomiliSec * days)) {
            
            currentCloseValue.unshift(threeMonthMarketData["Time Series (Daily)"][date]['4. close']);
            
        }

    }

    return {
        symbol: symbol,
        x: currentXAxis,
        close: currentCloseValue,
        stockAmount: stockAmount
    }


}