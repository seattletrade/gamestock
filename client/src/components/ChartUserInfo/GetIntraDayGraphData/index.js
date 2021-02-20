function GetIntraDayFirstGraphData(oneDayMarketData, stockAmount, currentFakeTime) {
    return dataProcessing(oneDayMarketData, stockAmount, currentFakeTime)
    // console.log(dataProcessing(oneDayMarketData, currentFakeTime));
    // return (dataProcessing(oneDayStockState, currentFakeTime));
}

function GetIntraDayGraphData(oneDayMarketData, stockAmount, currentFakeTime) {

}

function dataProcessing(oneDayMarketData, stockAmount, currentFakeTime) {
    // console.log("dataProcessing");
    // console.log(oneDayMarketData);

    let symbol = oneDayMarketData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentCloseValue = [];

    let days = 1;
    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    for (let date in oneDayMarketData["Time Series (15min)"]) {
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - days) {
            // Fake Date -> Change Previous day to Today
            if (date.substring(11, 16) === "04:15" || date.substring(11, 16) === "04:30" ||
                date.substring(11, 16) === "04:45" || date.substring(11, 16) === "05:00" || date.substring(11, 16) === "05:15" ||
                date.substring(11, 16) === "05:30" || date.substring(11, 16) === "05:45" || date.substring(11, 16) === "06:00" ||
                date.substring(11, 16) === "06:15" || date.substring(11, 16) === "06:30" || date.substring(11, 16) === "06:45" ||
                date.substring(11, 16) === "07:00" || date.substring(11, 16) === "07:15" || date.substring(11, 16) === "07:30" ||
                date.substring(11, 16) === "07:45" || date.substring(11, 16) === "08:00" || date.substring(11, 16) === "08:15" ||
                date.substring(11, 16) === "08:30" || date.substring(11, 16) === "08:45" || date.substring(11, 16) === "09:00"
            ) {
                // console.log("Pass Too early data")
            }else{
                currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)));
            }
        }

        // get Current data for Graph
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - days &&
            // Date.parse(currentFakeTime) - fiveHourmiliSec - (aDayTomiliSec * days) < Date.parse(date) &&
            Date.parse(date) < (Date.parse(currentFakeTime) - aDayTomiliSec * days)) {
            if (date.substring(11, 16) === "04:15" || date.substring(11, 16) === "04:30" ||
                date.substring(11, 16) === "04:45" || date.substring(11, 16) === "05:00" || date.substring(11, 16) === "05:15" ||
                date.substring(11, 16) === "05:30" || date.substring(11, 16) === "05:45" || date.substring(11, 16) === "06:00" ||
                date.substring(11, 16) === "06:15" || date.substring(11, 16) === "06:30" || date.substring(11, 16) === "06:45" ||
                date.substring(11, 16) === "07:00" || date.substring(11, 16) === "07:15" || date.substring(11, 16) === "07:30" ||
                date.substring(11, 16) === "07:45" || date.substring(11, 16) === "08:00" || date.substring(11, 16) === "08:15" ||
                date.substring(11, 16) === "08:30" || date.substring(11, 16) === "08:45" || date.substring(11, 16) === "09:00"
            ) {
                // console.log("Pass Too early data")
            }else{
                currentCloseValue.unshift(oneDayMarketData["Time Series (15min)"][date]['4. close']);
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



export {
    GetIntraDayFirstGraphData,
    GetIntraDayGraphData
}