import './App.css';

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { useContext, useReducer } from 'react';
import withAnalytics, { initAnalytics } from 'react-with-analytics';

import About from './components/About';
import CourseDetails from './components/CourseDetails';
import CoursePage from './components/coursePage';
import HomePage from './components/homePage';
import LandingPage from './components/landingPage';
import Login from './components/Login';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProfilePage from './components/profilePage';
import ReactGA from 'react-ga';
import Reducer from './store/Reducer';
import Snackbar from './components/Snackbar';
import Store from './store/Context';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins'],
  },
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

const GA_TRACKING_ID = 'UA-154109881-1';
const debug = process.env.NODE_ENV === 'production' ? false : true;
initAnalytics(GA_TRACKING_ID, { debug: debug });

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/listing" component={HomePage} />
      <Route exact path="/course" component={CoursePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/privacypolicy" component={PrivacyPolicy} />
      <Route
        exact
        path="/coursedetails/:provider/:uuid"
        component={CourseDetails}
      />
    </Switch>
  );
};

const AppWithRouter = withRouter(withAnalytics(Root));

function App() {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Store.Provider value={{ state, dispatch }}>
          <div className="App">
            <Snackbar />
            <Login />
            <AppWithRouter />
          </div>
        </Store.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
