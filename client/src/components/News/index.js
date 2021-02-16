import React from 'react'
import API from '../../utils/API'


export default function News() {

    API.getNews()
        .then(res => console.log(res))

    return (
        <div>
            News here
        </div>
    )
}