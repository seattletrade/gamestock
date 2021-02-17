import GetFakeDate from '../GetFakeDate';

export default function GetCurrentValueForLive(oneDayStockState, increaseFAKETime, currentFakeTime) {
    // console.log("fakeCurrentTime in CurrentValue");
    // console.log(currentFakeTime);
    // console.log(new Date(Date.parse(currentFakeTime)).getDate());
    if (oneDayStockState === undefined) {
        // console.log("Pass - Undefined in GetIntraDayMarketData Func")
        return {
            "setTraceStateIntraDay": { "null": "" },
            "setVolumeIntraDay": { "null": "" },
            "rangeIntraDay": { "null": "" }
        };
    } else {
        // Return differece ( After15MinCloseValue - After15MinOpenValue)
        return dataProcessing(oneDayStockState, increaseFAKETime, currentFakeTime);
    }

}


function dataProcessing(oneDayStockState, increaseFAKETime, currentFakeTime) {
    // console.log(oneDayStockState)
    // console.log(increaseFAKETime)

    // let increasorFAKETime = increaseFAKETime;
    let myDate = [];
    let currentOpenValue = [];
    let currentCloseValue = [];

    // 86400000 sec (= 1 day )
    let aDayTomiliSec = 86400000;

    // const fakeDate = GetFakeDate();

    for (let date in oneDayStockState["Time Series (15min)"]) {

        // get Open_Close value after 15 min from fakeDate for Displaying current value.
        if (new Date(Date.parse(date)).getDate() === new Date(Date.parse(currentFakeTime)).getDate() - 1 &&
            Date.parse(date) > (Date.parse(currentFakeTime) - aDayTomiliSec)) {
            myDate.unshift((new Date(Date.parse(currentFakeTime) + aDayTomiliSec)));
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