import React from 'react'
import PropTypes from 'prop-types';
import { 
    Card,
    CardPrimaryAction,
    CardMedia,
    CardMediaContent,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography'
import '@rmwc/card/styles';
import '@rmwc/typography/styles';


const CardVideo = (props) => {
    return (
        <Card style={{ width: '340px' }}>
            <CardPrimaryAction>
                <CardMedia
                    sixteenByNine
                    style={{
                        backgroundImage: `url(${props.thumbnail})`
                    }}
                >
                    <CardMediaContent
                        style={{
                            backgroundImage:
                            'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
                        }}
                    >
                        <Typography
                            use="subtitle2"
                            tag="div"
                            style={{ 
                                padding: '2.5rem 1rem',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                position: 'absolute',
                                color: 'white',
                                fontWeight: 'bold'
                             }}
                        >
                            { props.title }
                        </Typography> 
                        <Typography
                            use="subtitle3"
                            tag="div"
                            style={{ 
                                lineHeight: '1.5em',
                                height: '3em',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: '100%',
                                padding: '2.5rem 1rem',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                position: 'absolute',
                             }}
                        >
                            { props.description }
                        </Typography>
                    </CardMediaContent>
                </CardMedia>
            </CardPrimaryAction>
        </Card>
    )
}

CardVideo.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
}

export default CardVideo