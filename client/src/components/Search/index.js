import React, { useState } from 'react'

export default function Search() {
    const [searchInput, setSearchInput] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        console.log("user entered  " + searchInput); //searchInput is the state, console log is displaying the state
    };

    return (

        <form className="input-group mb-3 col-sm-4" onSubmit={handleSubmit}>
            <input type="text" className="form-control" placeholder="Symbol" aria-label="Search" onChange={e => setSearchInput(e.target.value)} />
            <div className="input-group-append" >
                <button className="btn btn-danger" type="submit">Search</button>
            </div>
        </form >

    )
}
