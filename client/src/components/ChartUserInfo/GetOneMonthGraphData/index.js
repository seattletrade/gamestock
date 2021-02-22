export default function GetOneMonthGraphData(oneMonthMarketData, stockAmount, currentFakeTime) {
    console.log(oneMonthMarketData);

    // console.log(dataProcessing(oneWeekMarketData, stockAmount, currentFakeTime))
    return dataProcessing(oneMonthMarketData, stockAmount, currentFakeTime)
}


function dataProcessing(oneMonthMarketData, stockAmount, currentFakeTime) {
    // console.log("dataProcessing");
    // console.log(oneMonthMarketData);

    let symbol = oneMonthMarketData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentCloseValue = [];

    let days = 1;
    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    for (let date in oneMonthMarketData["Time Series (Daily)"]) {
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 31) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
            
        }

        // get Current data for Graph
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 31 &&
            // Date.parse(currentFakeTime) - fiveHourmiliSec - (aDayTomiliSec * days) < Date.parse(date) &&
            Date.parse(date) < (Date.parse(currentFakeTime) - aDayTomiliSec * days)) {
            
            currentCloseValue.unshift(oneMonthMarketData["Time Series (Daily)"][date]['4. close']);
            
        }

    }

    return {
        symbol: symbol,
        x: currentXAxis,
        close: currentCloseValue,
        stockAmount: stockAmount
    }


}