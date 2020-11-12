import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useYoutubeApi = () => {
    const [url, setUrl] = useState('https://www.googleapis.com/youtube/v3/')
    const [key, setKey] = useState(process.env.REACT_APP_API_KEY || '')

    const requestSearch = (q) => {
        const qWithoutWithespaces = q.split(' ').join('+')
        const urlWithQueries = url + 'search?part=id,snippet&type=video&maxResults=6&q=' + qWithoutWithespaces + '&key=' + key
        return axios(urlWithQueries)
    } 

    const requestSearchByPage = (q, token) => {
        const qWithoutWithespaces = q.split(' ').join('+')
        const urlWithQueries = url + 'search?part=id,snippet&type=video&maxResults=6&pageToken=' + token + '&q=' + qWithoutWithespaces + '&key=' + key
        return axios(urlWithQueries)
    } 

    const requestSearchById = (id) => {
        const urlWithQueries = url + 'videos?id=' + id + '&part=snippet,statistics&key=' + key;
        return axios(urlWithQueries)
    }

    return {
        requestSearch,
        requestSearchByPage,
        requestSearchById
    }
}

export default useYoutubeApi