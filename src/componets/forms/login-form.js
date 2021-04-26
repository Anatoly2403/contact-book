import React, { useState, useContext } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './form.css';
import ServiceContext from '../service-context/service-context';

const LoginForm = ({ setLoggedIn }) => {
    const [passVisib, setPassVisib] = useState('password');
    const passInput = React.createRef();
    const loginInput = React.createRef();
    const [user, setUser] = useState({
        login: '',
        password: ''
    });

    const { getLoginUser } = useContext(ServiceContext);

    const handleChange = ({ target: { name, value } }) => {
        setUser(user => ({ ...user, [name]: value }))
        loginInput.current.style.border = '1px solid rgba(31, 32, 65, 0.25)'
        passInput.current.style.border = '1px solid rgba(31, 32, 65, 0.25)';
    }

    const onLoginUser = (e) => {
        e.preventDefault();
        if (user.login && user.password) {
            getLoginUser(user)
                .then(dataUsers => {
                    if (dataUsers.length < 1) {
                        loginInput.current.style.border = '1px solid red'
                        passInput.current.style.border = '1px solid red'
                        return
                    }
                    const confirmUser = dataUsers.find(dataUser => dataUser.password === user.password);
                    if (!confirmUser) {
                        return passInput.current.style.border = '1px solid red';
                    }
                    setLoggedIn(confirmUser.id);
                    localStorage.setItem('userId', confirmUser.id)
                })
                .catch(err => { console.log(err) })
        }
    }

    return (
        <form action="#" className='form' onSubmit={onLoginUser}>
            <label htmlFor="login" className='form__label'>
                login<br />
                <input
                    className="form__input"
                    ref={loginInput}
                    type="text"
                    name='login'
                    value={user.login}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="password" className='form__label'>
                password<br />
                <input
                    className="form__input"
                    ref={passInput}
                    type={passVisib}
                    name='password'
                    autoComplete='off'
                    value={user.password}
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
            <button className='from__btn btn'>sign in</button>
        </form>
    )
}

export default LoginForm;