import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@rmwc/typography';
import { Icon } from '@rmwc/icon';
import '@rmwc/typography/styles';
import './styles.css';

const VideoInfos = ({
    channel,
    likes,
    dislikes,
    description,
    views,
}) => (
    <div className="videoinfos-container">
        <Typography
            use="subtitle1"
            tag="h2"
            className="videoinfos-container__channel"
        >
            <strong>
                { channel }
            </strong>
        </Typography>
        <div className="videoinfos-container__counters-wrapper">
            <div className="videoinfos-container__count-wrapper">
                <Icon icon="thumb_up_alt" className="videoinfos-container__like" />
                <Typography
                    use="body1"
                    tag="div"
                >
                    <strong>
                        { likes }
                    </strong>
                </Typography>
            </div>
            <div className="videoinfos-container__count-wrapper">
                <Icon icon="thumb_down_alt" className="videoinfos-container__dislike" />
                <Typography
                    use="body1"
                    tag="div"
                >
                    <strong>
                        { dislikes }
                    </strong>
                </Typography>
            </div>
        </div>
        <div className="videoinfos-container__description-wrapper">
            <Typography
                use="body2"
                tag="div"
            >
                {description}
            </Typography>
        </div>
        <div className="videoinfos-container__views-wrapper">
            <Icon icon="remove_red_eye" />
            <Typography
                use="body1"
                tag="div"
            >
                <strong>
                    { views }
                </strong>
            </Typography>
        </div>
    </div>
);

VideoInfos.propTypes = {
    channel: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    dislikes: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
};

export default VideoInfos;
