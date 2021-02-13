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
        console.log('State changed!', searchResults);
    }, [searchResults, searchInput]);

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
            <Autocomplete
                getItemValue={(item) => item.label}
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
                onSelect={(val) => {
                    setSearchResults(val)
                    // change val to somehow connect the symbol
                }}
            />
            <ChartCompanyinfoMain />
            <CompanyInformation />
        </>
    )
}
