import React from 'react'
import ChartCompanyinfoMain from '../ChartCompanyinfoMain';

export default function Search() {
    return (
        <>
        <div className="input-group mb-3 col-sm-4">
            <input type="text" className="form-control" placeholder="Symbol" aria-label="Search" />
            <div className="input-group-append" >
                <button className="btn btn-danger" type="button">Search</button>
            </div>
        </div >

        <ChartCompanyinfoMain />

        </>

    )
}
