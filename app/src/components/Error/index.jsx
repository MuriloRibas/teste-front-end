import React from 'react';
import { Icon } from '@rmwc/icon';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '300px',
    height: '200px',
    textAlign: 'center',
};

const Error = ({ children }) => (
    <div style={styles}>
        <Icon
            icon={{
                icon: 'sentiment_very_dissatisfied',
                size: 'xlarge',
            }}
        />
        {
            children
        }
    </div>
);

export default Error;
