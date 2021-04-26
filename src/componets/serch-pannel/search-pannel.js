import React from 'react';
import './search-pannel.css';

const SearchPannel = ({find, setFind }) => {
    return (
        <div className="user__controll-pannel">
            <input
                className='search-input'
                type="text"
                placeholder='Search'
                value={find}
                onChange={({ target }) => setFind(target.value)} />
        </div>
    )
}

export default SearchPannel;