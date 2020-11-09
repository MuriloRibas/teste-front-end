import React, { useState } from 'react'
import Input from '../../components/Input';
import './styles.css'
import { Button } from '@rmwc/button'
import '@rmwc/button/styles';

export const Search = () => {
    const [search, setSearch] = useState('asdasd')

    return (
        <div className="container">
            <form className="container__form">
                <Input
                    value={search}
                    setValue={(e) => setSearch(e.target.value)}
                />
                <Button 
                    raised
                    label="Buscar"
                    className="container__button"
                />
            </form>
        </div>
    )
}
