import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionButton,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import '@rmwc/card/styles';
import '@rmwc/typography/styles';
import './styles.css';

const CardVideo = ({
    thumbnail,
    title,
    channelTitle,
    description,
    handleClickButton,
}) => (
    <Card className="container-card">
        <CardMedia
            sixteenByNine
            style={{
                backgroundImage: `url(${thumbnail})`,
            }}
        />
        <div className="container-card__content-wrapper">
            <Typography
                use="headline6"
                tag="h2"
            >
                <strong>
                    { title }
                </strong>
            </Typography>
            <Typography
                use="body1"
                tag="h3"
            >
                <strong>
                    { channelTitle }
                </strong>
            </Typography>
            <div>
                <Typography
                    use="body2"
                    tag="div"
                >
                    { description }
                </Typography>
            </div>
        </div>
        <CardActions className="container-card__actions-wrapper">
            <CardActionButtons>
                <CardActionButton
                    unelevated
                    onClick={handleClickButton}
                >
                    Detalhes do Vídeo
                </CardActionButton>
            </CardActionButtons>
        </CardActions>
    </Card>
);

CardVideo.propTypes = {
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    handleClickButton: PropTypes.func.isRequired,
};

export default CardVideo;
