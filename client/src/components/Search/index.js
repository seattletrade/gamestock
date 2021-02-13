import axios from 'axios';
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
                handleList(result.data.bestMatches);
            })
            .catch(err => console.log(err));
        ;
    };

    const handleList = res => {
        const list = [];
        res.map((item) => {
            console.log(item["1. symbol"] + " name " + item["2. name"])
            list.push({ label: item["2. name"], symbol: item["1. symbol"] })
        })
        setSearchList(list);
    }
    return (
        <>
        <div style={{marginTop:"30px"}}>
            <Autocomplete
                getItemValue={(item) => item.symbol}
                items={searchList}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.symbol} {item.label}
                    </div>
                }
                value={searchInput}
                //set inputstate here^
                onChange={handleChange}
                //need to handle delete display at some point
                onSelect={(item) => {
                    setSearchResults(item)
                }}
            />
        </div>
            {/* the searchResults state holds the symbol the user selected from the list, can be passed down and used in other part of the app i think */}
            <ChartCompanyinfoMain />
            <CompanyInformation />
        </>
    )
}
