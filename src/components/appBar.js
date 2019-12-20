import React, { useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { LOGIN_MODAL } from '../store/Types';
import Logo from './../assets/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Store from '../store/Context';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { logout } from '../actions/ContextActions';
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
    borderColor: '#FFA502',
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

const ImageWithRouter = withRouter(({ history, ...props }) => (
  <img
    style={{ align: 'center' }}
    className={props.clazzNames}
    src={props.image}
    alt="samarthLogo"
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

export default function TopBar(props) {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();

  const handleLoginModal = () => {
    dispatch({
      type: LOGIN_MODAL,
      payload: true,
    });
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      style={{
        background: '#FFF',
      }}
    >
      <Toolbar style={{}}>
        <div className={classes.logoHorizontallyCenter}>
          <ImageWithRouter
            image={Logo}
            routingURL={'/'}
            clazzNames={classes.logo}
            alt="logo"
          />
        </div>
        {props.isSearchIncluded && (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for a course"
              value={props.initialSearchValue}
              onChange={props.onChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        )}

        <div className={classes.rightLogin}>
          {state.isAuth ? <IconWithRouter routingURL={'/profile'} /> : null}
          {!state.isAuth ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                className="signup-btn"
                onClick={handleLoginModal}
              >
                Signup
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className="login-btn"
                onClick={handleLoginModal}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              onClick={() => logout(dispatch)}
              variant="outlined"
              color="primary"
              className="signup-btn"
            >
              Logout
            </Button>
          )}
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}></div>
      </Toolbar>
    </AppBar>
  );
}

// Add a padding to the
