import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';

const Input = (props) => {
    return (
        <TextField 
            required
            placeholder="Pesquisar"
            pattern="[^\W_]{1,}" 
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