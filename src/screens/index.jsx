import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DarkTheme, LightTheme } from 'themes';

import { GlobalStyle } from "components/common";
import { ThemeProvider } from "styled-components";

import Login from 'screens/Login';
import Home from 'screens/Home';

const Screens = props => {
    const [theme, setTheme] = useState(LightTheme);

    return (
        <ThemeProvider
            theme={{
                ...theme,
                setTheme: () => setTheme(t => t.id === 'light' ? DarkTheme : LightTheme)
            }}
        >
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route exact path='/'> <Home /> </Route>
                    <Route path='/login'> <Login /> </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    )
};

export default Screens;
