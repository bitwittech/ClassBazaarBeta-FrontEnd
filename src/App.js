import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TopAppBar from './components/appBar';
import HomePage from './components/homePage';
import CoursePage from './components/coursePage';
import logo from './logo.svg';
import withAnalytics, { initAnalytics } from 'react-with-analytics';
import './App.css';

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2699fb',
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
    <Route exact path="/" component={HomePage} />
    <Route exact path="/course" component={CoursePage} />
  </Switch>
);

const AppWithRouter = withRouter(withAnalytics(Root));

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <TopAppBar />
          <AppWithRouter />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
