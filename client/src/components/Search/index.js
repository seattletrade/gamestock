import React, { useState, useEffect } from 'react';
import API from "../../utils/API";


import ChartCompanyinfoMain from '../ChartCompanyinfoMain';
import CompanyInformation from '../CompanyInformation';
import CompanyNews from '../CompanyNews';
import Autocomplete from "react-autocomplete";

export default function Search() {
    const [searchInput, setSearchInput] = useState();
    const [symbolResult, setSymbolResult] = useState();
    const [searchListFromDB, setSearchListFromDB] = useState();
    const [searchList, setSearchList] = useState([]);
    const [nameResult, setNameResult] = useState();
    const [searchResult, setSearchResult] = useState({ "symbol": "", "companyName": "" });

    const [isSymbol, setIsSymbol] = useState(false);
    // useEffect(() => {
    //     // console.log(symbolResult)
    //     // console.log(nameResult);
    // }, [symbolResult])

    // call All Symbols data from DB
    useEffect(() => {
        API.getSymbols()
            .then(res => {
                // console.log(res.data)
                setSearchListFromDB(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        // console.log("Changed isSymbol")
        // console.log(isSymbol);
    }, [isSymbol])

    const handleChange = e => {
        e.preventDefault();
        // setSearchInput(e.target.value);
        let userInput = e.target.value.trim();
        // console.log(userInput);
        setSearchInput(userInput);
        let searchQuery = searchListFromDB.filter(list => {
            // console.log(list["Symbol"].toLowerCase())
            // console.log(userInput);
            return ((list["Symbol"] + list["Company Name"]).toLowerCase().includes(userInput.toLowerCase()))
        })
        let searchListsUnder10 = []
        if (searchQuery.length > 10) {
            for (let i = 0; i < 10; i++) {
                searchListsUnder10.push(searchQuery[i])
            }
        } else {
            for (let i = 0; i < searchQuery.length; i++) {
                searchListsUnder10.push(searchQuery[i])
            }
        }
        // console.log(searchListsUnder10)
        setSearchList(searchListsUnder10)
    };

    return (
        <>
            { searchListFromDB ? (
                <div style={{ zIndex: 10, marginTop: "", position: "absolute" }} >
                    <Autocomplete
                        getItemValue={(item) => item.Symbol + "/" + item["Company Name"]}
                        items={searchList}
                        renderItem={(item, isHighlighted) =>
                            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                                key={item.Symbol}>
                                {item.Symbol} {item["Company Name"]}
                                {/* {setNameResult(item["Company Name"])} */}
                            </div>
                        }
                        inputProps={{ placeholder: 'Search' }}
                        value={searchInput}
                        onChange={handleChange}
                        onSelect={(item) => {
                            // console.log(item.split("/"));
                            // console.log(item.split("/")[0]);
                            // console.log(item.split("/")[1]);
                            // setSymbolResult(item)
                            API.getIntraMarketData(item.split("/")[0], "60min")
                                .then(res => {
                                    if (res["data"]["Error Message"]) {
                                        setIsSymbol(false)
                                    } else {
                                        setIsSymbol(true)
                                    }
                                    // console.log(res);
                                })
                                .then(err => {
                                    if (err !== undefined) {
                                        setIsSymbol(false)
                                    }
                                })
                            setSearchResult({
                                "symbol": item.split("/")[0],
                                "companyName": item.split("/")[1]
                            })
                        }}
                    />
                </div>
            )
                :
                (<></>)
            }
            {isSymbol ? (
                <>
                    <ChartCompanyinfoMain companyName={searchResult["companyName"]} symbol={searchResult["symbol"]} />
                    <CompanyInformation symbol={searchResult["symbol"]} />
                    <CompanyNews symbol={searchResult["symbol"]} />
                </>
            ) : (<div style={{ textAlign: "center", color: "white", paddingTop: "100px" }}>Search by Company name or Symbol</div>)}

        </>
    )
}
