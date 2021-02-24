export default function GetOneWeekGraphData(oneWeekMarketData, stockAmount, currentFakeTime) {


    // console.log(dataProcessing(oneWeekMarketData, stockAmount, currentFakeTime))
    return dataProcessing(oneWeekMarketData, stockAmount, currentFakeTime)

}


function dataProcessing(oneWeekMarketData, stockAmount, currentFakeTime) {
    // console.log("dataProcessing");
    // console.log(oneWeekMarketData);

    let symbol = oneWeekMarketData["Meta Data"]["2. Symbol"];
    let currentXAxis = [];
    let currentCloseValue = [];

    let days = 1;
    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    for (let date in oneWeekMarketData["Time Series (60min)"]) {
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 8) {
            // Fake Date -> Change Previous day to Today
            if (date.substring(11, 16) === "05:00" || date.substring(11, 16) === "06:00" ||
                date.substring(11, 16) === "07:00" || date.substring(11, 16) === "08:00" ||
                date.substring(11, 16) === "19:00" || date.substring(11, 16) === "20:00"
            ) {
                // console.log("Pass Too early data")
            } else {
                currentXAxis.unshift((new Date(Date.parse(date) + aDayTomiliSec)).toString().substring(4, 21));
            }
        }

        // get Current data for Graph
        if (Date.parse(date) > Date.parse(currentFakeTime) - aDayTomiliSec * 8 &&
            // Date.parse(currentFakeTime) - fiveHourmiliSec - (aDayTomiliSec * days) < Date.parse(date) &&
            Date.parse(date) < (Date.parse(currentFakeTime) - aDayTomiliSec * days)) {
            if (date.substring(11, 16) === "05:00" || date.substring(11, 16) === "06:00" ||
                date.substring(11, 16) === "07:00" || date.substring(11, 16) === "08:00" ||
                date.substring(11, 16) === "19:00" || date.substring(11, 16) === "20:00"
            ) {
                // console.log("Pass Too early data")
            } else {
                currentCloseValue.unshift(oneWeekMarketData["Time Series (60min)"][date]['4. close']);
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