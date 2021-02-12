import axios from 'axios';
import React, { useState } from 'react';
import ChartCompanyinfoMain from '../ChartCompanyinfoMain';

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
                console.log(result.data.bestMatches[0])
                let resultsData = result.data.bestMatches[0];
                console.log(resultsData);
                setSearchResults(resultsData);
                console.log(searchResults)

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
