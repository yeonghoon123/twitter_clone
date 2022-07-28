import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from '../route/Home';
import Auth from '../route/Auth';

const AppRouter = ({loginStatus}) => {
    return (
        <Router>
            <Switch>
            <Route exact path="/">
                {loginStatus ? 
                    <Home />
                : 
                    <Auth />
                }
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter