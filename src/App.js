import React, { useContext, useReducer } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/homePage';
import LandingPage from './components/landingPage';
import CoursePage from './components/coursePage';
import About from './components/About';
import ProfilePage from './components/profilePage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Store from './store/Context';
import Reducer from './store/Reducer';
import withAnalytics, { initAnalytics } from 'react-with-analytics';
import './App.css';
import Login from './components/Login';
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

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/listing" component={HomePage} />
      <Route exact path="/course" component={CoursePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/privacypolicy" component={PrivacyPolicy} />
    </Switch>
  );
};

const AppWithRouter = withRouter(withAnalytics(Root));

function App() {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);
  console.log(state);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Store.Provider value={{ state, dispatch }}>
          <div className="App">
            <Login />
            <AppWithRouter />
          </div>
        </Store.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
