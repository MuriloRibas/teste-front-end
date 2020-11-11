import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useYoutubeApi = () => {
    const [url, setUrl] = useState('https://www.googleapis.com/youtube/v3/search')
    const [key, setKey] = useState(process.env.REACT_APP_API_KEY || '')

    const requestSearch = (q) => {
        const qWithoutWithespaces = q.split(' ').join('+')
        const urlWithQueries = url + '?part=id,snippet&q=' + qWithoutWithespaces + '&key=' + key
        return axios(urlWithQueries)
    } 

    return {
        requestSearch
    }
}

export default useYoutubeApi