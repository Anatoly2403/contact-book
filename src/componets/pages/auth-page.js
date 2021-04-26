import React from 'react';
import { LoginForm, RegForm } from '../forms'


const AuthPage = ({ authType, setLoggedIn }) => {
    return (authType === 'login')
        ? <LoginForm setLoggedIn={setLoggedIn} /> : <RegForm setLoggedIn={setLoggedIn} />
}

export default AuthPage;