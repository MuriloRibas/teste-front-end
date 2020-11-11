import React, { useState } from 'react'
import Input from '../../components/Input';
import './styles.css'
import { Button } from '@rmwc/button'
import '@rmwc/button/styles';
import useYoutubeApi from '../../hooks/useYoutubeApi';
import CardVideo from '../../components/CardVideo';

export const Search = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const { requestSearch } = useYoutubeApi()

    const handleSubmit = async (e) => {
        e.preventDefault()
        requestSearch(search)
            .then(res => setData(res.data.items) )
            .catch(err => console.log(err) )

    } 

    return (
        <div className="container">
            <form className={"container__form" + (data.length > 0 ? ' container__form--animated_top animate__animated animate__fadeInUp' : '')} onSubmit={handleSubmit}>
                <Input
                    value={search}
                    setValue={(e) => setSearch(e.target.value)}
                    fullWidth
                />
                <Button 
                    className="container__button"
                    raised
                    label="Buscar"
                />
            </form>
            {data.length > 0 &&
                <div className="container__cardswrapper animate__animated animate__fadeInUp">
                    {data.map((el, i) => 
                        <CardVideo 
                            key={i}
                            thumbnail={el.snippet.thumbnails.medium.url}
                            title={el.snippet.title}
                            description={el.snippet.description}
                            channelTitle={el.snippet.channelTitle}
                        />
                    )}
                </div>
            }
        </div>
    )
}
