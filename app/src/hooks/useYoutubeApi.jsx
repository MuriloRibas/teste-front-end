import React, { useState, useEffect } from 'react'
import axios from 'axios'

// LOADING
// DOIS SCROLLS DIRETOS = DUAS REQUESTS

const useYoutubeApi = () => {
    const [url, setUrl] = useState('https://www.googleapis.com/youtube/v3/search')
    const [key, setKey] = useState(process.env.REACT_APP_API_KEY || '')

    const requestSearch = (q) => {
        const qWithoutWithespaces = q.split(' ').join('+')
        const urlWithQueries = url + '?part=id,snippet&maxResults=6&q=' + qWithoutWithespaces + '&key=' + key
        console.log(urlWithQueries)
        return axios(urlWithQueries)
    } 

    const requestSearchByPage = (q, token) => {
        const qWithoutWithespaces = q.split(' ').join('+')
        const urlWithQueries = url + '?part=id,snippet&maxResults=6&pageToken=' + token + '&q=' + qWithoutWithespaces + '&key=' + key
        console.log(urlWithQueries)
        return axios(urlWithQueries)
    } 

    return {
        requestSearch,
        requestSearchByPage
    }
}

export default useYoutubeApi