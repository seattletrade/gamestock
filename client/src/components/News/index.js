import React, { useEffect, useState } from 'react'
import API from '../../utils/API'


export default function News() {
    const [headline, setHeadline] = useState();

    //usestate setup here, to useeffect below
    useEffect(() => {

        API.getNews()
            .then(res => {
                console.log(res)
                setHeadline(res.data[0].headline)
            }
            )
    }, [])

    return (
        <div>
            News here
            {headline}
        </div>
    )
}