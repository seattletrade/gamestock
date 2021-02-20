function GetIntraDayFirstGraphData(oneDayMarketData, currentFakeTime) {
    return dataProcessing(oneDayMarketData, currentFakeTime)
    // console.log(dataProcessing(oneDayMarketData, currentFakeTime));
    // return (dataProcessing(oneDayStockState, currentFakeTime));
}

function GetIntraDayGraphData(oneDayMarketData, currentFakeTime){

}

function dataProcessing(oneDayMarketData, currentFakeTime){
    console.log("dataProcessing");
    // console.log(oneDayMarketData);

    let symbol = oneDayMarketData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentCloseValue = [];

    let days = 1;
     // 86400000 sec (= 1 day )
     let aDayTomiliSec = 86400000;
     let fiveHourmiliSec = 18000000;

    for (let date in oneDayMarketData["Time Series (15min)"]) {
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - days &&
        Date.parse(currentFakeTime) - fiveHourmiliSec - (aDayTomiliSec * days) < Date.parse(date)) {
            // Fake Date -> Change Previous day to Today
            currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)));
            // currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
        }

        // get Current data for Graph
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - days  &&
            Date.parse(currentFakeTime) - fiveHourmiliSec - (aDayTomiliSec * days) < Date.parse(date) &&
            Date.parse(date) < (Date.parse(currentFakeTime) - aDayTomiliSec * days)) {
            currentCloseValue.unshift(oneDayMarketData["Time Series (15min)"][date]['4. close']);
        }
    }

    return {
        symbol: symbol,
        x:currentXAxis,
        close:currentCloseValue
    }

}



export {
    GetIntraDayFirstGraphData,
    GetIntraDayGraphData
}