import React from 'react';
import loading from '../img/loading.gif';

const Lazy = () => {
    return (
        <div className='lazy'>
            <img src={loading} alt="loading..." title='loading...' />
            <p>loading...</p>
        </div>
    )
}

export default Lazy
