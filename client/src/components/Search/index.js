import React, { useState, useEffect } from 'react';
import API from "../../utils/API";

import ChartCompanyinfoMain from '../ChartCompanyinfoMain';
import CompanyInformation from '../CompanyInformation'
// import Autocomplete from "react-autocomplete";

export default function Search() {
    // const [searchInput, setSearchInput] = useState();
    // const [searchResults, setSearchResults] = useState();
    // const [searchList, setSearchList] = useState([]);

    // useEffect(() => {
    //     console.log('State changed!', 'searchInput:' + searchInput, 'searchResults:' + searchResults, 'searchList:' + searchList);
    // }, [searchInput, searchResults, searchList]);

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
    const [allSymbols, setAllSymbols] = useState();
    const [inputValue, setInputValue] = useState();
    const [count, setCount] = useState(0);
    const [inputFormValues, setInputFormValues] = useState([{ Symbol: "MSFT" }]);

    useEffect(() => {
        API.getSymbols()
            .then(res => {
                console.log(res.data);
                setAllSymbols(res.data);
            });
    }, [])

    function onChangeFilter(e) {
        console.log(e.target.value.replace(/\s/g, ''))
        setInputValue(e.target.value)
        console.log(allSymbols);
        // console.log(allSymbols[0]["Company Name"])
        console.log(allSymbols.filter(company => company["Company Name"].toLowerCase().includes(e.target.value.trim().toLowerCase())))
        let selectedArr = allSymbols.filter(company => company["Company Name"].toLowerCase().includes(e.target.value.trim().toLowerCase()))

        let finalArr = [];

        if (selectedArr.length > 10) {
            for (let i = 0; i < 10; i++) {
                finalArr.push(selectedArr[i])
            }
        } else {
            for (let i = 0; i < selectedArr.length; i++) {
                finalArr.push(selectedArr[i])
            }
        }

        setInputFormValues(finalArr);
    }
    return (
        <>
            <div style={{ marginTop: "30px" }}>
                {/* <Autocomplete
                    getItemValue={(item) => item.symbol}
                    items={searchList
                        .filter((searchList) => searchList.region === 'United States')
                    }
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.symbol} {item.label}
                        </div>
                    }
                    inputProps={{ placeholder: 'Search' }}
                    value={searchInput}
                    onChange={handleChange}
                    onSelect={(item) => setSearchResults(item)}
                /> */}
                <h1>Find for a company symbol</h1>
                <input className="" onChange={onChangeFilter} placeholder="Search"></input>
                <ul id="myUL">
                    {
                        (inputFormValues.length ? (
                            inputFormValues.map(company => {
                                return (
                                    <li><a href="#">{company.Symbol} {company["Company Name"]}</a></li>
                                )
                            })) : (<div></div>))
                    }
                </ul>
            </div>
            {/* the searchResults state holds the symbol the user selected from the list, can be passed down and used in other part of the app i think */}
            {/* {searchResults ? ( */}
            <>
                <ChartCompanyinfoMain symbol={"TSLA"} companyName={"Tesla"} />
                <CompanyInformation symbol={"TSLA"} companyName={"Tesla"} />
            </>
            {/* ) : (<div></div>)} */}

        </>
    )
}
