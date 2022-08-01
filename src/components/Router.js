import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from '../route/Home';
import Auth from '../route/Auth';
import Profile from '../route/Profile';
import Navigation from "./Navigation";

const AppRouter = ({ loginStatus }) => {
    return (
        <Router>
            <Switch>
                {loginStatus ?
                    <>
                        <Navigation />
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                    :
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter