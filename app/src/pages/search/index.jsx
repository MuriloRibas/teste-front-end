import React, { useState, useEffect } from 'react'
import Input from '../../components/Input';
import './styles.css'
import { Button } from '@rmwc/button'
import '@rmwc/button/styles';
import useYoutubeApi from '../../hooks/useYoutubeApi';
import CardVideo from '../../components/CardVideo';
import useListenerScrollBottom from '../../hooks/useListenerScrollBottom';
import Loading from '../../components/Loading';

const Search = (props) => {
    const [search, setSearch] = useState('')
    const [nextPageToken, setNextPageToke] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const { requestSearch, requestSearchByPage } = useYoutubeApi()
    const isBottom = useListenerScrollBottom()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        requestSearch(search)
            .then(res => {
                setNextPageToke(res.data.nextPageToken)
                setData(res.data.items) 
                setLoading(false)
            })
            .catch(err => console.log(err) )
    } 

    const handleNewPageSearch = () => {
        setLoading(true)
        requestSearchByPage(search, nextPageToken)
            .then(res => {
                setNextPageToke(res.data.nextPageToken)
                setData(d => d.concat(res.data.items)) 
                setLoading(false)
            })
            .catch(err => console.log(err) )
    }

    const handleRedirect = (id) => props.history.push('/details/' + id)

    useEffect(() => {
        function checkScroll() {
            if (data.length > 0 && !loading && isBottom) return handleNewPageSearch()
        }
        return checkScroll()
        
    }, [isBottom])

    return (
        <div className="search-container">
            <form className={"search-container__form" + (data.length > 0 ? ' search-container__form--animated_top animate__animated animate__fadeInUp' : '')} onSubmit={handleSubmit}>
                <Input
                    value={search}
                    setValue={(e) => setSearch(e.target.value)}
                    fullWidth
                />
                <Button 
                    className="search-container__button"
                    raised
                    label="Buscar"
                />
            </form>
            {data.length > 0 &&
                <div className="search-container__cardswrapper animate__animated animate__fadeInUp">
                    {data.map((el, i) => 
                        <CardVideo 
                            key={i}
                            thumbnail={el.snippet.thumbnails.medium.url}
                            title={el.snippet.title}
                            description={el.snippet.description}
                            channelTitle={el.snippet.channelTitle}
                            handleClickButton={() => handleRedirect(el.id.videoId)}
                        />
                    )}
                </div>
            }
            {loading && <Loading/>}
        </div>
    )
}

export default Search