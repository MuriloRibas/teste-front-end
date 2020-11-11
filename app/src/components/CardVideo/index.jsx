import React from 'react'
import PropTypes from 'prop-types';
import { 
    Card,
    CardPrimaryAction,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionButton
} from '@rmwc/card';
import { Typography } from '@rmwc/typography'
import '@rmwc/card/styles';
import '@rmwc/typography/styles';
import './styles.css';

const CardVideo = (props) => {
    return (
        <Card className="container-card">
            <CardMedia
                sixteenByNine
                style={{
                    backgroundImage: `url(${props.thumbnail})`
                }}
            />
            <div className="container-card__content-wrapper">
                    <Typography
                        use="headline6"
                        tag="h2"
                    >
                        <strong>
                        { props.title }

                        </strong>
                    </Typography>
                    <Typography
                        use="body1"
                        tag="h3"
                    >
                        <strong>
                            { props.channelTitle }
                        </strong>
                    </Typography>
                    <div>
                        <Typography
                            use="body2"
                            tag="div"
                        >
                            { props.description }
                        </Typography>
                    </div>
            </div>
            <CardActions className="container-card__actions-wrapper">
                <CardActionButtons>
                    <CardActionButton unelevated>Detalhes do Vídeo</CardActionButton>
                </CardActionButtons>
            </CardActions>
        </Card>
    )
}

CardVideo.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    channelTitle: PropTypes.string,
    description: PropTypes.string
}

export default CardVideo