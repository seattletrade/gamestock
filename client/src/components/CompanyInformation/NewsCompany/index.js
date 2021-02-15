import React from 'react'
import API from '../../../utils/API'


export default function NewsCompany() {

    API.getCompanyNews("https://newsapi.org/v2/top-headlines?country=us&category=business&q=microsoft&pageSize=3&apiKey=f772c81f7ec347abb45275fdcfe6e11f")
        .then(res => console.log(res))

    return (
        <div>
            
        </div>
    )
}
