import React, { useState, useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from '@rmwc/button';
import '@rmwc/button/styles';
import Input from '../../components/Input';
import './styles.css';
import CardVideo from '../../components/CardVideo';
import Loading from '../../components/Loading';
import Error from '../../components/Error/index';

import useYoutubeApi from '../../hooks/useYoutubeApi';
import useListenerScrollBottom from '../../hooks/useListenerScrollBottom';

const Search = (props) => {
    const [search, setSearch] = useState('');
    const [nextPageToken, setNextPageToke] = useState('');
    const [data, setData] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const { requestSearch, requestSearchByPage } = useYoutubeApi();
    const isBottom = useListenerScrollBottom();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setNoResults(false);
        setLoading(true);
        requestSearch(search)
            .then((res) => {
                if (res.data.items.length > 0) {
                    setNextPageToke(res.data.nextPageToken);
                    setData(res.data.items);
                    setLoading(false);
                } else {
                    setData([]);
                    setNoResults(true);
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

    const handleNewPageSearch = () => {
        setError(false);
        setNoResults(false);
        setLoading(true);
        requestSearchByPage(search, nextPageToken)
            .then((res) => {
                if (res.data.items.length > 0) {
                    setNextPageToke(res.data.nextPageToken);
                    setData((d) => d.concat(res.data.items));
                    setLoading(false);
                } else {
                    setNoResults(true);
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };
    const handleRedirect = (id) => props.history.push(
        {
            pathname: `/details/${id}`,
            state: {
                nextPageToken,
                data,
                search,
            },
        },
    );

    useEffect(() => {
        function checkScroll() {
            if (data.length > 0 && !loading && isBottom) handleNewPageSearch();
        }
        return checkScroll();
    }, [isBottom]);

    useEffect(() => {
        function checkIfNeedLastActivity() {
            if (props.location.state
                && props.location.state.nextPageToken
                && props.location.state.data) {
                setSearch(props.location.state.search);
                setData(props.location.state.data);
                setNextPageToke(props.location.state.nextPageToken);
            }
        }

        checkIfNeedLastActivity();
    }, []);

    return (
        <>
            <div className="search-container">
                <form
                    className={
                        `search-container__form${
                            data.length > 0 || noResults || loading || error
                                ? ' search-container__form--animated_top animate__animated animate__fadeInUp'
                                : ''}`
                    }
                    onSubmit={handleSubmit}
                >
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

                {data.length > 0
                    && (
                        <div className="search-container__cardswrapper animate__animated animate__fadeInUp">
                            {data.map((el) => (
                                <CardVideo
                                    key={el.id.videoId}
                                    thumbnail={el.snippet.thumbnails.medium.url}
                                    title={el.snippet.title}
                                    description={el.snippet.description}
                                    channelTitle={el.snippet.channelTitle}
                                    handleClickButton={() => handleRedirect(el.id.videoId)}
                                />
                            ))}
                        </div>
                    )}
                {noResults
                    && (
                        <Error>
                            <span>Não encontramos vídeos com o termo buscado.</span>
                            <span>Utilize outras palavras-chave</span>
                        </Error>
                    )}
                {error
                    && (
                        <Error>
                            <span>Ocorreu um erro.</span>
                            <span>Tente novamente mais tarde.</span>
                        </Error>
                    )}
            </div>
            {loading && <Loading />}
        </>
    );
};

Search.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
};

export default Search;
