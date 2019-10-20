import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/homePage';
import LandingPage from './components/landingPage';
import CoursePage from './components/coursePage';
import ProfilePage from './components/profilePage';
import logo from './logo.svg';
import withAnalytics, { initAnalytics } from 'react-with-analytics';
import './App.css';

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFA502',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2699fb',
      contrastText: '#000',
    },
    type: 'light',
    textSecondary: {
      main: '#DCDCDC',
    },
    // text: {
    //   primary: "#fff",
    // }
    // error: will use the default color
  },
});

const Root = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/listing" component={HomePage} />
    <Route exact path="/course" component={CoursePage} />
    <Route exact path="/profile" component={ProfilePage} />
  </Switch>
);

const AppWithRouter = withRouter(withAnalytics(Root));

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <AppWithRouter />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
