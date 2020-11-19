import './App.css';
import './index.scss';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { useContext, useEffect, useReducer } from 'react';
import withAnalytics, { initAnalytics } from 'react-with-analytics';

import About from './components/About';
import Contactus from './components/Contactus';
import Edubuk from './components/edubuk'
import CourseDetails from './components/CourseDetails';
import CoursePage from './components/coursePage';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import MobileAuth from './components/MobileAuth';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProfilePage from './components/ProfilePage';
import ReactGA from 'react-ga';
import Reducer from './store/Reducer';
import ScrollToTop from './components/ScrollToTop';
import Snackbar from './components/Snackbar';
import StaticCourseDetails from './components/StaticCourseDetails';
import Store from './store/Context';
import config from './config.json';
import { fetchUser } from './actions/ContextActions';
import localForage from 'localforage';
import { trackPage } from 'react-with-analytics/lib/utils';
import AltMBA from './components/AltMBA';
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins'],
  },
  palette: {
    primary: {
      main: '#f15a29',
      contrastText: '#fff',
    },
    secondary: {
      main: '#086065',
      contrastText: '#000',
    },
    type: 'light',
    textSecondary: {
      main: '#DCDCDC',
    },
  },
});
const GA_TRACKING_ID = 'UA-154109881-1';
const debug = process.env.NODE_ENV === 'production' ? false : true;
initAnalytics(GA_TRACKING_ID, { debug: debug });
ReactGA.initialize(GA_TRACKING_ID, {
  debug: true,
});

const Root = props => {
  useEffect(() => {
    props.history.listen(location => trackPage(location.pathname));
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/listing" component={HomePage} />
      <Route exact path="/course" component={CoursePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/privacypolicy" component={PrivacyPolicy} />
      <Route exact path="/mobileauth" component={MobileAuth} />
      <Route exact path="/coursedetail" component={StaticCourseDetails} />
      <Route exact path="/coursedetails/altmba" component={AltMBA} />
      <Route
        exact
        path="/coursedetails/:provider/:uuid"
        component={CourseDetails}
      />
      <Route exact path="/contact" component={Contactus} />
      <Route exact path="/edubuk" component={Edubuk} />
    </Switch>
  );
};
var store = localForage.createInstance(config.localForage);
const AppWithRouter = withRouter(withAnalytics(Root));

function App() {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    if (state.token) {
      fetchUser(state.token, dispatch);
    }
  }, []);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Store.Provider value={{ state, dispatch }}>
          <div className="App" style={{ background: '#FFF' }}>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                  crossOrigin="anonymous"/>
            <Snackbar />
            <Login />
            <AppWithRouter />
          </div>
        </Store.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export { App, store };
