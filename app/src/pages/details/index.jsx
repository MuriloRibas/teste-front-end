import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './styles.css'
import VideoInfos from '../../components/VideoInfos'
import useYoutubeApi from '../../hooks/useYoutubeApi';
import Loading from '../../components/Loading';
import { IconButton } from '@rmwc/icon-button'
import '@rmwc/icon-button/styles';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';

const Details = (props) => {
    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    
    const { requestSearchById } = useYoutubeApi()

    const handleSearch = () => {
        setError(false)
        setLoading(true)
        requestSearchById(id)
            .then(res => {
                setLoading(false)
                setData(res.data.items[0])
            })
            .catch(err => {
                setLoading(false)
                setError(true)
            })
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <>
            
            { loading && <Loading/>}

            { data.snippet !== undefined && 
                <div className="details-container">
                    <div className="details-container__title">
                        <IconButton
                            icon="keyboard_arrow_left"
                            className="details-container__icon"
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
                        src={"http://www.youtube.com/embed/" + data.id.videoId }
                    />

                    <VideoInfos
                        channel={data.snippet.channelTitle} 
                        description={data.snippet.description}
                        likes={data.statistics.likeCount}
                        dislikes={data.statistics.dislikeCount}
                        views={data.statistics.viewCount}
                    />
                </div>
            }
        </>
    )
}

export default Details