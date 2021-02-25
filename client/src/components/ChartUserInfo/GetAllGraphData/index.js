export default function GetOneYearGraphData(GetOneYearGraphData, stockAmount, currentFakeTime, investingStartDay) {
    // console.log(GetOneYearGraphData);

    // console.log(dataProcessing(oneWeekMarketData, stockAmount, currentFakeTime))
    return dataProcessing(GetOneYearGraphData, stockAmount, currentFakeTime, investingStartDay)
}


function dataProcessing(threeMonthMarketData, stockAmount, currentFakeTime, investingStartDay) {
    // console.log("dataProcessing");
    // console.log(threeMonthMarketData);

    let symbol = threeMonthMarketData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentCloseValue = [];

    let days = 1;
    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    for (let date in threeMonthMarketData["Time Series (Daily)"]) {
        if (Date.parse(date) > Date.parse(investingStartDay)) {
            // if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 90) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 15));
            
        }

        // get Current data for Graph
        if (Date.parse(date) > Date.parse(investingStartDay) &&
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