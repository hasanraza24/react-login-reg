import React from 'react';
import {  Redirect } from 'react-router'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Header from '../containers/header/header.container';
import Home from '../containers/home/home.container';
import InnerPage from '../containers/inner-page/innner-page.container'
import ResetPwd from '../containers/reset-password/reset-password.container';
const token = localStorage.getItem("token");
export default (

    <Router>
            <Route exact path="*" component={Header} />
            <Route exact path="/" component={Home} />
            <Route exact path="/inner-page" render={() => (
            !token ? (
                <Redirect to="/"/>
            ) : (
                <InnerPage/>
            )
            )}/>
            <Route exact path="/reset-password" component={ResetPwd} />
    </Router>

)