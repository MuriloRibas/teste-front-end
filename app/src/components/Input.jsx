import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@rmwc/textfield';

import 'material-design-icons';
import '@rmwc/icon/styles';
import '@rmwc/textfield/styles';

const Input = ({ value, setValue }) => (
    <TextField
        outlined
        icon="search"
        required
        placeholder="Pesquisar"
        pattern="^[\w ]+$"
        value={value}
        onChange={setValue}
    />
);

Input.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default Input;
