import React, { useState, useEffect } from 'react';
import './app.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from '../header';
import { AuthPage, UserPage } from '../pages';
import Footer from '../footer';


const App = () => {
    const [formType, setFormType] = useState('login');
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            const userId = localStorage.getItem('userId');
            setLoggedIn(+userId)
        }
    }, [])

    return (
        <div className="app">
            <Header
                isLoggedIn={isLoggedIn}
                setFormType={setFormType}
                setLoggedIn={setLoggedIn}
            />
           
            <Switch>
                <Route path='/' exact>
                    {(!isLoggedIn)
                        ? <AuthPage authType={formType} setLoggedIn={setLoggedIn} />
                        : <Redirect to='/user' />}
                </Route>
                <Route path='/user' exact>
                    {(isLoggedIn)
                        ? <UserPage id={isLoggedIn} />
                        : <Redirect to='/' />}
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}


export default App;