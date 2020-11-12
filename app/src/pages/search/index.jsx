import React, { useState, useEffect } from 'react'
import Input from '../../components/Input';
import './styles.css'
import { Button } from '@rmwc/button'
import '@rmwc/button/styles';
import useYoutubeApi from '../../hooks/useYoutubeApi';
import CardVideo from '../../components/CardVideo';
import useListenerScrollBottom from '../../hooks/useListenerScrollBottom';
import Loading from '../../components/Loading';
import Error from '../../components/Error/index';

const Search = (props) => {
    const [search, setSearch] = useState('')
    const [nextPageToken, setNextPageToke] = useState('')
    const [data, setData] = useState([])
    const [noResults, setNoResults] = useState(false)

    const [loading, setLoading] = useState(false)

    const { requestSearch, requestSearchByPage } = useYoutubeApi()
    const isBottom = useListenerScrollBottom()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setNoResults(false)
        setLoading(true)
        requestSearch(search)
            .then(res => {
                if (res.data.items.length > 0) {
                    setNextPageToke(res.data.nextPageToken)
                    setData(res.data.items) 
                    setLoading(false)
                } else {
                    setData([])
                    setNoResults(true)
                    setLoading(false)
                }
            })
            .catch(err => console.log(err) )
    } 

    const handleNewPageSearch = () => {
        setNoResults(false)
        setLoading(true)
        requestSearchByPage(search, nextPageToken)
            .then(res => {
                if (res.data.items.length > 0) {
                    setNextPageToke(res.data.nextPageToken)
                    setData(d => d.concat(res.data.items)) 
                    setLoading(false)
                } else {
                    setNoResults(true)
                    setLoading(false)
                }

            })
            .catch(err => console.log(err) )
    }

    const handleRedirect = (id) => 
        props.history.push(
            { 
                pathname: '/details/' + id,
                state: { 
                    nextPageToken,
                    data,
                    search,
                }
            }
        )

    useEffect(() => {
        function checkScroll() {
            if (data.length > 0 && !loading && isBottom) return handleNewPageSearch()
        }
        return checkScroll()
        
    }, [isBottom])

    useEffect(() => {
        function checkIfNeedLastActivity() {
            if (props.location.state && props.location.state.nextPageToken && props.location.state.data) {
                setSearch(props.location.state.search)
                setData(props.location.state.data)
                setNextPageToke(props.location.state.nextPageToken)
            }
        }

        checkIfNeedLastActivity()
    }, [])

    return (
        <div className="search-container">
            <form className={"search-container__form" + (data.length > 0 || noResults || loading ? ' search-container__form--animated_top animate__animated animate__fadeInUp' : '')} onSubmit={handleSubmit}>
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
            {noResults && 
                <Error>
                    <span>Não encontramos vídeos com o termo buscado.</span>
                    <span>Utilize outras palavras-chave</span>
                </Error>
            }
        </div>
    )
}

export default Search