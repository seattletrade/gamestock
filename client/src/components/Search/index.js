import React, { useState, useEffect } from 'react';
import API from "../../utils/API";

import ChartCompanyinfoMain from '../ChartCompanyinfoMain';
import CompanyInformation from '../CompanyInformation'
import Autocomplete from "react-autocomplete";

export default function Search() {
    const [searchInput, setSearchInput] = useState();
    const [searchResults, setSearchResults] = useState();
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        console.log('State changed!', 'searchInput:' + searchInput, 'searchResults:' + searchResults, 'searchList:' + searchList);
    }, [searchInput, searchResults, searchList]);

    const handleChange = e => {
        e.preventDefault();
        setSearchInput(e.target.value);
        API.searchEndpoint(searchInput)
            .then(result => {
                handleList(result.data.bestMatches)
            })
            .catch(err => console.log(err));

    };

    const handleList = res => {
        const list = [];
        res.map((item) => {
            list.push({ label: item["2. name"], symbol: item["1. symbol"], region: item["4. region"], matchScore: item["9. matchScore"] })

        })
        setSearchList(list);
    }
    return (
        <>
            <div style={{ marginTop: "30px" }}>
                <Autocomplete
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
                />
            </div>
            {/* the searchResults state holds the symbol the user selected from the list, can be passed down and used in other part of the app i think */}
            {searchResults ? (
                <>
                <ChartCompanyinfoMain symbol = {searchResults} companyName = {searchInput}  />
                <CompanyInformation symbol = {searchResults} companyName = {searchInput}/>
                </>
            ):(<div></div>)}
            
        </>
    )
}
