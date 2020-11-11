import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@rmwc/textfield';

import 'material-design-icons'
import '@rmwc/icon/styles';
import '@rmwc/textfield/styles';

const Input = (props) => {
    return (
        <TextField 
            outlined
            icon="search"
            required
            placeholder="Pesquisar"
            pattern="^[\w ]+$" 
            value={props.value}
            onChange={props.setValue}   
        />
    )
}

Input.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func
}

export default Input