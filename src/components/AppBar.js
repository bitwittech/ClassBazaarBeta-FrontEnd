import { Link, withRouter } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { DebounceInput } from 'react-debounce-input';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { LOGIN_MODAL } from '../store/Types';
import Logo from './../assets/logo.png';
import BlackLogo from './../assets/img/logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ProfileIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Store from '../store/Context';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { logout } from '../actions/ContextActions';
import { trackEvent } from 'react-with-analytics';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f15a29',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    maxHeight: 38,
    padding: 5,
  },
  logoHorizontallyCenter: {
    flex: 1,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  rightLogin: {
    marginLeft: 'auto',
    marginRight: -12,
  },
}));

const SearchInput = () => {
  const classes = useStyles();
  return (
    <InputBase
      placeholder="Search for a course"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{ 'aria-label': 'search' }}
    />
  );
};

const ImageWithRouter = withRouter(({ history, ...props }) => (
  <img
    style={{ align: 'center' }}
    className={props.clazzNames}
    src={props.image}
    alt="samarthLogo"
    style={{ maxHeight: '45px', marginTop: '10px' }}
    onClick={() => {
      history.push(props.routingURL);
    }}
  ></img>
));

const IconWithRouter = withRouter(({ history, ...props }) => (
  <IconButton
    color="inherit"
    aria-label="More Options"
    onClick={() => {
      history.push(props.routingURL);
    }}
  >
    <ProfileIcon color="primary" />
  </IconButton>
));

function TopBar(props) {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  const handleLogout = () => {
    props.history.push('/');
    logout(dispatch);
  };
  const handleUserMobile = () => {
    props.history.push('/mobileauth');
  };

  let shouldSwitch = true;
  const [toggleAppBarTheme, setToggleAppBarTheme] = useState(false);

  if (typeof window != 'undefined') {
    if (window.location.pathname !== '/' && window.location.pathname !== '/contact' && window.location.pathname !== '/edubuk') {
      shouldSwitch = false;
    } else {
      window.addEventListener('scroll', function(event) {
        if (window.innerWidth < 800) {
          setToggleAppBarTheme(true);
          return;
        }
        if (window.scrollY > window.innerHeight && !toggleAppBarTheme) {
          setToggleAppBarTheme(true);
        } else if (window.scrollY < window.innerHeight && toggleAppBarTheme) {
          setToggleAppBarTheme(false);
        }
      });
    }
  }
  return (
    <AppBar
      position="static"
      style={{ padding: '10px 10px', boxShadow: 'none' }}
      color="inherit"
      className={`sticky ${
        !toggleAppBarTheme && shouldSwitch
          ? 'app-bar-transparent'
          : 'app-bar-colored'
      }`}
    >
      <div className="appbar-flex">
        <div className="topbar-cont">
          <div
            className="no-desktop logoBackground"
          >
            <div className="div" style={{ textAlign: 'center' }}>
              <ImageWithRouter
                image={`${
                  !toggleAppBarTheme && shouldSwitch
                    ? Logo
                    : BlackLogo

                }`}
                routingURL={'/'}
                clazzNames={`${classes.logo} click-h adj-i`}
                alt="logo"
                style={{ margin: 'auto' }}
                onClick={() => {
                  trackEvent(
                    'HeaderIcon',
                    'Click',
                    `${props.location.pathname}`
                  );
                }}
              />
            </div>
            <div className={props.home ? 'no-mobile' : ''}>
              {props.noHome ? null : <MenuIcon />}
            </div>
          </div>
          <div className="searchbar-div no-mobile">
            <div>
              {' '}
              <ImageWithRouter
                image={`${
                  !toggleAppBarTheme && shouldSwitch
                    ? Logo
                    : BlackLogo
                    
                }`}
                routingURL={'/'}
                clazzNames={`${classes.logo} click-h adj-i`}
                alt="logo"
                onClick={() => {
                  trackEvent(
                    'HeaderIcon',
                    'Click',
                    `${props.location.pathname}`
                  );
                }}
              />
            </div>
            {!props.isSearchIncluded ? (
              <p className="color-white no-mobile"></p>
            ) : null}
          </div>

          <div className="end-flex">
            <div>
              {!state.isAuth ? (
                <PermIdentityIcon
                  onClick={handleUserMobile}
                  className="no-desktop"
                />
              ) : null}
              {state.isAuth ? <IconWithRouter routingURL={'/profile'} /> : null}
              {!state.isAuth ? (
                <>
                  <Link
                    to={'/'}
                    variant="outlined"
                    color="primary"
                    className="signup-btn no-mobile header-links"
                  >
                    Home
                  </Link>
                  <Link
                    to={'/listing'}
                    variant="outlined"
                    color="primary"
                    className="signup-btn no-mobile header-links"
                  >
                    Courses
                  </Link>
                  <Link
                    to={'/about'}
                    variant="outlined"
                    color="primary"
                    className="signup-btn no-mobile header-links"
                  >
                    About Us
                  </Link>
                  <Link
                    to={'/contact'}
                    style={{ marginRight: '10px' }}
                    variant="outlined"
                    color="primary"
                    className="signup-btn no-mobile header-links"
                  >
                    Contact
                  </Link>
                  {props.isSearchIncluded && (
                    <div
                      className="no-mobile"
                      style={{ display: 'inline-block' }}
                    >
                      <div className="s-bar">
                        <div className="s-b">
                          <DebounceInput
                            minLength={2}
                            className="s-input"
                            debounceTimeout={500}
                            onChange={props.onChange}
                            onKeyPress={props.onKeyPress}
                            placeholder="Search for a course"
                            value={props.initialSearchValue}
                          />
                        </div>
                        <div className="s-a">
                          <div>
                            {' '}
                            <SearchIcon className="mt-2 pd" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    className="signup-btn no-mobile header-links"
                    onClick={() =>
                      dispatch({
                        type: LOGIN_MODAL,
                        payload: {
                          open: true,
                          state: 1,
                        },
                      })
                    }
                  >
                    Signup
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="login-btn signup-btn no-mobile"
                    onClick={() => {
                      dispatch({
                        type: LOGIN_MODAL,
                        payload: {
                          open: true,
                          state: 0,
                        },
                      });
                    }}
                  >
                    LOGIN
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => handleLogout()}
                  variant="outlined"
                  color="primary"
                  className="signup-btn"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppBar>
  );
}

export default withRouter(TopBar);
