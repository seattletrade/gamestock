import GetFakeDate from '../GetFakeDate';

export default function GetCurrentValueForLive(oneDayStockState, increaseFAKETime) {
    // console.log("In GetCurrentValueForLive")

    if (oneDayStockState === undefined) {
        // console.log("Pass - Undefined in GetIntraDayMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        // Return differece ( After15MinCloseValue - After15MinOpenValue)
        return dataProcessing(oneDayStockState, increaseFAKETime);
    }

}


function dataProcessing(oneDayStockState, increaseFAKETime) {
    // console.log(oneDayStockState)
    // console.log(increaseFAKETime)

    let increasorFAKETime = increaseFAKETime;
    let myDate = [];
    let currentOpenValue = [];
    let currentCloseValue = [];

    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    const fakeDate = GetFakeDate();

    for (let date in oneDayStockState["Time Series (15min)"]) {

        // get Open_Close value after 15 min from fakeDate for Displaying current value.
        if (new Date(Date.parse(date)).getDate() === fakeDate.getDate() - 1 &&
            Date.parse(date) > (Date.parse(fakeDate) + increasorFAKETime - aDayTomiliSec)) {
            myDate.unshift((new Date(Date.parse(date) + aDayTomiliSec)));
            currentOpenValue.unshift(oneDayStockState["Time Series (15min)"][date]['1. open']);
            currentCloseValue.unshift(oneDayStockState["Time Series (15min)"][date]['4. close']);
        }
    }
    // console.log(myDate);
    // console.log(currentOpenValue);
    // console.log(currentCloseValue);
    // console.log(currentCloseValue[0]  - currentOpenValue[0])
    return currentCloseValue[0] - currentOpenValue[0]

}