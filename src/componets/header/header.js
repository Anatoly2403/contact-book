import React from 'react';
import './header.css';
import logo from '../../img/logo.png';

const Header = ({ isLoggedIn, setFormType, setLoggedIn }) => {
    const setFunction = () => {
        if (isLoggedIn) {
            setLoggedIn(false);
            localStorage.removeItem('userId')
            return
        }
        setFormType('login')
    };
    return (
        <div className="header">
            <div className='header__logo'>
                <img src={logo} alt="logo" />
            </div>
            <div className='header__btn-group'>
                <button
                    className='header__login btn'
                    onClick={setFunction}>
                    {(!isLoggedIn) ? 'login' : 'logout'}
                </button>
                {(!isLoggedIn) && (<button
                    className='header__registration btn'
                    onClick={() => setFormType('registration')}>
                    registration
                </button>)}
            </div>
        </div >
    )
}




export default Header;