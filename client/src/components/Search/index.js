import React, { useState, useEffect } from 'react';
import API from "../../utils/API";

import ChartCompanyinfoMain from '../ChartCompanyinfoMain';
import CompanyInformation from '../CompanyInformation'
import Autocomplete from "react-autocomplete";

export default function Search() {
    const [searchInput, setSearchInput] = useState();
    const [searchResults, setSearchResults] = useState();
    const [searchListFromDB, setSearchListFromDB] = useState();
    const [searchList, setSearchList] = useState([]);
    const [nameResult, setNameResult] = useState();

    // useEffect(() => {
    //     console.log('State changed!', 'searchInput:' + searchInput, 'searchResults:' + searchResults, 'nameResult:' + nameResult, 'searchList:' + searchList);
    // }, [searchInput, searchResults, searchList]);

    // call All Symbols data from DB
    useEffect(() => {
        API.getSymbols()
            .then(res => {
                console.log(res.data)
                setSearchListFromDB(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        e.preventDefault();
        // setSearchInput(e.target.value);
        let userInput = e.target.value.trim();
        // console.log(userInput);
        setSearchInput(userInput);
        let searchQuery = searchListFromDB.filter(list => {
            // console.log(list["Symbol"].toLowerCase())
            // console.log(userInput);
            return ((list["Symbol"] + list["Company Name"] ).toLowerCase().includes(userInput.toLowerCase()))
        })
        let searchListsUnder10 = []
        if (searchQuery.length > 10) {
            for (let i = 0; i < 10; i++) {
                searchListsUnder10.push(searchQuery[i])
            }
        }else{
            for (let i = 0; i < searchQuery.length; i++) {
                searchListsUnder10.push(searchQuery[i])
            }
        }
        // console.log(searchListsUnder10)
        setSearchList(searchListsUnder10)
    };

    // const handleChange = e => {
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    //     API.searchEndpoint(searchInput)
    //         .then(result => {
    //             handleList(result.data.bestMatches)
    //         })
    //         .catch(err => console.log(err));

    // };

    // const handleList = res => {
    //     const list = [];
    //     res.map((item) => {
    //         list.push({ label: item["2. name"], symbol: item["1. symbol"], region: item["4. region"], matchScore: item["9. matchScore"] })

    //     })
    //     setSearchList(list);
    // }
    return (
        <>
            <div style={{ zIndex: 10, marginTop: "", position: "absolute" }} >
                <Autocomplete
                    getItemValue={(item) => item.Symbol}
                    items={searchList}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                            key={item.Symbol}>
                            {item.Symbol} {item["Company Name"]}
                            {setNameResult(item["Company Name"])}
                        </div>
                    }
                    inputProps={{ placeholder: 'Search' }}
                    value={searchInput}
                    onChange={handleChange}
                    onSelect={(item) => {
                        setSearchResults(item)
                    }}
                />
                {/* <Autocomplete
                    getItemValue={(item) => item.symbol}
                    items={searchList
                        .filter((searchList) => searchList.region === 'United States')
                    }
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                            key={item.symbol}>
                            {item.symbol} {item.label}
                            {setNameResult(item.label)}
                        </div>
                    }
                    inputProps={{ placeholder: 'Search' }}
                    value={searchInput}
                    onChange={handleChange}
                    onSelect={(item) => {
                        setSearchResults(item)
                    }}
                /> */}
            </div>
            {searchResults ? (
                <>
                    <ChartCompanyinfoMain symbol={searchResults} companyName={nameResult} />
                    <CompanyInformation symbol={searchResults} />
                </>
            ) : (<div></div>)}

        </>
    )
}
