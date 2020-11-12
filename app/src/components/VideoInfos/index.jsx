import React from 'react'
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography'
import { Icon } from '@rmwc/icon'
import '@rmwc/typography/styles'
import './styles.css'

const VideoInfos = (props) => {
    return (
        <div className="videoinfos-container">
            <Typography
                use="subtitle1"
                tag="h2"
                className="videoinfos-container__channel"
            >
                <strong>
                    { props.channel }
                </strong>
            </Typography>
            <div className="videoinfos-container__counters-wrapper">
                <div className="videoinfos-container__count-wrapper">
                    <Icon icon="thumb_up_alt"/>
                    <Typography
                        use="body1"
                        tag="div"
                    >
                        <strong>
                            { props.likes }
                        </strong>
                    </Typography>
                </div>
                <div className="videoinfos-container__count-wrapper">
                    <Icon icon="thumb_down_alt"/>

                    <Typography
                        use="body1"
                        tag="div"
                    >
                        <strong>
                            { props.dislikes }
                        </strong>
                    </Typography>
                </div>
            </div>
            <div className="videoinfos-container__description-wrapper">
                <Typography
                    use="body2"
                    tag="div"
                >
                    {props.description}
                </Typography>
            </div>
            <div className="videoinfos-container__views-wrapper">
                <Icon icon="remove_red_eye"/>
                <Typography
                    use="body1"
                    tag="div"
                >
                    <strong>
                        { props.views }
                    </strong>
                </Typography>
            </div>
        </div>
    )
}

VideoInfos.propTypes = {
    channel: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.string,
    dislikes: PropTypes.string,
    views: PropTypes.string
}

export default VideoInfos
