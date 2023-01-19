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

const AppRouter = ({refreshUserinfo, loginStatus, userinfoObj }) => {
    return (
        <Router>
            <Switch>
                {loginStatus ?
                    <>
                        <Navigation userinfoObj={userinfoObj}/>
                        <Route exact path="/" >
                            <Home userinfoObj={userinfoObj}/>
                        </Route>

                        <Route path="/profile">
                            <Profile userinfoObj={userinfoObj} refreshUserinfo={refreshUserinfo}/>
                        </Route>
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