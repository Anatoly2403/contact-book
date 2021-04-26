import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './componets/app';
import ServiceContext from './componets/service-context';
import UserService from './serviсes/userService';
import ErrorBoundry from './componets/error-boundry';



const userService = new UserService();



ReactDOM.render(
    <ServiceContext.Provider value={userService}>
        <ErrorBoundry>
            <Router>
                <App />
            </Router>
        </ErrorBoundry>
    </ServiceContext.Provider>
    , document.getElementById('root'));


