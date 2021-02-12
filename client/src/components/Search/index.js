import axios from 'axios';
import React, { useState } from 'react';
import ChartCompanyinfoMain from '../ChartCompanyinfoMain';
import Autocomplete from "react-autocomplete";

export default function Search() {
    const [searchInput, setSearchInput] = useState();
    const [searchResults, setSearchResults] = useState();

    function searchEndpoint(inputState) {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const keyword = inputState;
        const API_SearchEndpoint_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`;
        return axios.get(API_SearchEndpoint_Call);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("user entered  " + searchInput); //searchInput is the state, console log is displaying the state
        searchEndpoint(searchInput)
            .then(result => {
                console.log("API RESULT:");
                console.log(result.data.bestMatches[0]["1. symbol"])
                let resultsData = result.data.bestMatches[0]["1. symbol"].toString();
                console.log(resultsData);
                setSearchResults(resultsData);
                console.log(searchResults) //toString made this not undefined
                //searchResults state holds the user's inputted symbol to be used in the graph api call

            })
            .catch(err => console.log(err));

        ;
    };

    return (

        <>
            <form className="input-group mb-3 col-sm-4" onSubmit={handleSubmit}>
                <input type="text" className="form-control" placeholder="Symbol" aria-label="Search" onChange={e => setSearchInput(e.target.value)} />

                <div className="input-group-append" >
                    <button className="btn btn-danger" type="submit">Search</button>
                </div>
            </form >
            <div>

            </div>


            <ChartCompanyinfoMain />

        </>

    )
}
