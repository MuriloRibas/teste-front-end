/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useParams } from 'react-router-dom';
import './styles.css';
import { IconButton } from '@rmwc/icon-button';
import '@rmwc/icon-button/styles';
import { Typography } from '@rmwc/typography';
import VideoInfos from '../../components/VideoInfos';
import useYoutubeApi from '../../hooks/useYoutubeApi';
import Loading from '../../components/Loading';
import '@rmwc/typography/styles';
import Error from '../../components/Error/index';

const Details = (props) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const { id } = useParams();
    const { requestSearchById } = useYoutubeApi();

    const handleSearch = () => {
        requestSearchById(id)
            .then((res) => {
                if (res.data.items.length > 0) {
                    setError(false);
                    setData(res.data.items[0]);
                    setLoading(false);
                } else {
                    setError(false);
                    setNoResults(true);
                }
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    };

    const handleRedirect = () => {
        if (props.location.state && props.location.state.data) {
            const {
                nextPageToken,
                search,
            } = props.location.state;

            const dataFromUrl = props.location.state.data;
            props.history.push(
                {
                    pathname: '/',
                    state: {
                        nextPageToken,
                        search,
                        data: dataFromUrl,
                    },
                },
            );
        } else {
            props.history.push('/');
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="details-container">
            { loading && <Loading />}
            { data && data.snippet !== undefined && (
                <>
                    <div className="details-container__title">
                        <IconButton
                            icon="keyboard_arrow_left"
                            className="details-container__icon"
                            onClick={handleRedirect}
                        />
                        <Typography
                            use="headline6"
                            tag="h1"
                        >
                            {data.snippet.title}
                        </Typography>
                    </div>

                    <iframe
                        title={data.snippet.title}
                        className="details-container__video"
                        id="ytplayer"
                        type="text/html"
                        src={`http://www.youtube.com/embed/${data.id.videoId}`}
                    />

                    <VideoInfos
                        channel={data.snippet.channelTitle}
                        description={data.snippet.description}
                        likes={data.statistics.likeCount}
                        dislikes={data.statistics.dislikeCount}
                        views={data.statistics.viewCount}
                    />
                </>
            )}
            { !loading && (!data || data.snippet) === undefined
                && (
                    <Error>
                        Vídeo não encontrado.
                    </Error>
                )}
        </div>
    );
};

export default Details;
