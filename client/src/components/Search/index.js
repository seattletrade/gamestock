import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ChartCompanyinfoMain from '../ChartCompanyinfoMain';
import Autocomplete from "react-autocomplete";

export default function Search() {
    const [searchInput, setSearchInput] = useState();
    const [searchResults, setSearchResults] = useState();
    const [searchList, setSearchList] = useState([]);

    function searchEndpoint(inputState) {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const keyword = inputState;
        const API_SearchEndpoint_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`;
        return axios.get(API_SearchEndpoint_Call);
    }
    useEffect(() => {
        console.log('State changed!', searchResults);
    }, [searchResults, searchInput]);

    const handleChange = e => {
        e.preventDefault();
        setSearchInput(e.target.value);
        searchEndpoint(searchInput)
            .then(result => {
                handleList(result.data.bestMatches);
                // let resultsData = result.data.bestMatches[0]["1. symbol"].toString();
                // console.log(resultsData);


                // ;

                // console.log(searchResults) //toString made this not undefined? sometimes? not always?
                //searchResults state holds the user's inputted symbol to be used in the graph api call

            })
            .catch(err => console.log(err));

        ;
    };

    const handleList = res => {
        console.log(res);
        const list = [];
        res.map((item) => {
            console.log(item["1. symbol"] + " name " + item["2. name"])
            list.push({ label: item["2. name"], symbol: item["1. symbol"] })
        })
        setSearchList(list);
    }



    return (

        <>
            {/* <form className="input-group mb-3 col-sm-4">
                <input type="text" className="form-control" placeholder="Symbol" aria-label="Search" onChange={handleChange} />

                <div className="input-group-append" >
                    <button className="btn btn-danger" type="submit">Search</button>
                </div>
            </form > */}

            <Autocomplete
                getItemValue={(item) => item.label}
                items={searchList}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                    </div>
                }
                value={searchInput}
                //set inputstate here^
                onChange={handleChange}
                //need to handle delete display at some point


                onSelect={(val) => {
                    setSearchResults(val)
                    // return value = val
                    //set state here?
                }}
            />

            <ChartCompanyinfoMain />


        </>

    )
}
