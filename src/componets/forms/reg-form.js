import React, { useState, useContext, createRef } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import './form.css';
import ServiceContext from '../service-context/service-context';


const RegForm = ({ setLoggedIn }) => {
    const { registerUser } = useContext(ServiceContext);
    const confirm = createRef();
    const [passVisib, setPassVisib] = useState('password');
    const [confVisib, setConfVisib] = useState('password');
    const [user, setUser] = useState({
        login: '',
        phone: '',
        password: '',
        confirm: ''
    });

   

    const onLoginNewUser = (e) => {
        e.preventDefault();
        document.querySelectorAll(`.form__input`).forEach(input => {
            if (!input.value) { input.style.border = '1px solid red'; }
        });

        if (user.password !== user.confirm) { 
            confirm.current.style.border = '1px solid red';
            return
        }

        if (user.password === user.confirm && user.password && user.phone && user.login) {
            registerUser(user)
                .then(data => {
                    setLoggedIn(data.id)
                    localStorage.setItem('userId', data.id)
                })
                .catch(err => alert(err))
        }
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser(user => ({ ...user, [name]: value }))
        document.querySelector(`.form__input[name=${name}]`).style.border = '1px solid rgba(31, 32, 65, 0.25)';
    }

    return (
        <form action="#" className='form' onSubmit={onLoginNewUser}>
            <label htmlFor="login" className='form__label'>
                login<br />
                <input
                    className="form__input"
                    type="text"
                    name='login'
                    value={user.login}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="phone" className='form__label'>
                phone<br />
                <input
                    className="form__input"
                    type="tel"
                    name='phone'
                    value={user.phone}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="password" className='form__label'>
                password<br />
                <input
                    className="form__input"
                    type={passVisib}
                    name='password'
                    value={user.password}
                    autoComplete='off'
                    onChange={handleChange}
                />
                {(passVisib === 'text')
                    ? <div
                        className='visib'
                        onClick={() => setPassVisib('password')}>
                        <EyeInvisibleOutlined />
                    </div>
                    : <div
                        className='visib'
                        onClick={() => setPassVisib('text')}>
                        <EyeOutlined />
                    </div>}
            </label>
            <label htmlFor="confirm" className='form__label'>
                confirm<br />
                <input
                    ref={confirm}
                    className="form__input"
                    type={confVisib}
                    name='confirm'
                    autoComplete='off'
                    value={user.confirm}
                    onChange={handleChange}
                />
                {(confVisib === 'text')
                    ? <div
                        className='visib'
                        onClick={() => setConfVisib('password')}>
                        <EyeInvisibleOutlined />
                    </div>
                    : <div
                        className='visib'
                        onClick={() => setConfVisib('text')}>
                        <EyeOutlined />
                    </div>}
            </label>
            <button className='from__btn btn'>registration</button>
        </form>

    )
}

export default RegForm;