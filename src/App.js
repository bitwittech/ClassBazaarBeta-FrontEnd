import './App.css';
import './index.scss';
import './styles/SearchBar.css';
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import withAnalytics, { initAnalytics } from 'react-with-analytics';
// import data from './components/searchData/data.json'

import About from './components/About';
import Contactus from './components/Contactus';
import Career from './components/Career';
import Edubuk from './components/edubuk';
// import CourseDetails from './components/CourseDetails';
import CoursePage from './components/coursePage';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
// import Verified from './components/Verified';
import Login from './components/Login';
// prelogbox added by Yashwant Sahu
import PreLogBox from './components/PreLogBox';
import EdubukForm from './components/EdubukFrom';

import MobileAuth from './components/MobileAuth';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProfilePage from './components/ProfilePage';
import ReactGA from 'react-ga';
import Reducer from './store/Reducer';
import ScrollToTop from './components/ScrollToTop';
import Snackbar from './components/Snackbar';
import StaticCourseDetails from './components/StaticCourseDetails';
import Store, { UserTrack } from './store/Context';
import config from './config.json';
import { fetchUser } from './actions/ContextActions';
import localForage from 'localforage';
import { trackPage } from 'react-with-analytics/lib/utils';
import AltMBA from './components/AltMBA';
// import { Pre_LOG_Box } from './store/Types';
import axios from 'axios';

// new frontend components
import Home from './new_frontend/components/home/Home';
import Signup from './new_frontend/components/log_signup/Signup';
import Log_In from './new_frontend/components/log_signup/Login';
import CourseList from './new_frontend/components/courses/CourseList';
import Details from './new_frontend/components/courses/Details';
import NewSnack from './new_frontend/components/utils/NewSnack';
import Verified from './new_frontend/components/utils/Verification';

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

// const Root = (props) => {
//   useEffect(() => {
//     localStorage.setItem('parameter', props.history.location.search);
//     props.history.listen((location) => trackPage(location.pathname));
//   }, [props.history]);
//   return (
//     <Switch>
//       {/* <Route exact path="/" component={LandingPage} /> */}
//       <Route exact path="/listing" component={HomePage} />
//       <Route exact path="/listing/:search" component={HomePage} />
//       <Route exact path="/course" component={CoursePage} />
//       <Route exact path="/career" component={Career} />
//       <Route exact path="/profile" component={ProfilePage} />
//       <Route exact path="/about" component={About} />
//       <Route exact path="/privacypolicy" component={PrivacyPolicy} />
//       <Route exact path="/mobileauth" component={MobileAuth} />
//       <Route exact path="/coursedetail" component={StaticCourseDetails} />
//       <Route exact path="/coursedetails/altmba" component={AltMBA} />
//       {/* <Route
//         exact
//         path="/coursedetails/:provider/:uuid"
//         component={CourseDetails}
//       /> */}
//       <Route exact path="/contact" component={Contactus} />
//       <Route exact path="/edubuk" component={Edubuk} />
//       {/* // new components */}
//       {/* <Route exact path="/" component={Home} />
//       <Route exact path="/signup" component={Signup} />
//       <Route exact path="/login" component={Log_In} /> */}
//     </Switch>
//   );
// };
const NewRoot = (props) => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location]);
  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem('parameter', props.history.location.search);
    props.history.listen((location) => trackPage(location.pathname));
  }, [props.history]);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Log_In} />
      <Route exact path="/listing" component={CourseList} />
      <Route exact path="/listing/:search" component={CourseList} />
      <Route exact path="/courseDetails/:provider/:uuid" component={Details} />
      <Route exact path="/contact" component={Contactus} />
      <Route exact path="/about" component={About} />
      <Route exact path="/career" component={Career} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/verified" component={Verified} />
      <Route exact path="/edubuk" component={Edubuk} />
    </Switch>
  );
};

var store = localForage.createInstance(config.localForage);
const AppWithRouter = withRouter(withAnalytics(NewRoot));

function App() {
  const initialState = useContext(Store);

  const [tracker, setTracker] = useState([]);
  const [state, dispatch] = useReducer(Reducer, initialState);

  const officialURL = 'https://api.classbazaar.com/';
  const localURL = 'http://0.0.0.0:8080/';

  const handleUnload = async (ev) => {
    // ev.preventDefault();
    const user_email = localStorage.getItem('user') || 'User Not Logged In';

    const start_time = localStorage.getItem('start_time');
    const path = localStorage.getItem('path');

    await axios.get(
      `${localURL}api/userTrack?user_email=${user_email}&time_stamp=${start_time}&path=${path}`
    );
  };

  useEffect(() => {
    // OpenLogin();
    let start_time = new Date().toLocaleString();
    localStorage.setItem('start_time', start_time);

    // navigator.geolocation.getCurrentPosition(function (position) {
    //   let lat = position.coords.latitude;
    //   let long = position.coords.longitude;

    //   localStorage.setItem(
    //     'location',
    //     JSON.stringify({ latitude: lat.toFixed(2), longitude: long.toFixed(2) })
    //   );
    // });

    window.addEventListener('beforeunload', handleUnload);

    if (state.token) {
      fetchUser(state.token, dispatch);
    }
  }, [state.token]);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <UserTrack.Provider value={{ tracker, setTracker }}>
          <Store.Provider value={{ state, dispatch }}>
            <div className="App" style={{ background: '#FFF' }}>
              <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
              />
              <Snackbar />
              <NewSnack />
              <Login />
              <PreLogBox />
              <EdubukForm />
              <AppWithRouter />
            </div>
          </Store.Provider>
        </UserTrack.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export { App, store, UserTrack };
