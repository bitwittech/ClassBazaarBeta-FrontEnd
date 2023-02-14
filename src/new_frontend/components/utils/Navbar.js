import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  List,
  IconButton,
  SwipeableDrawer,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// css
import '../../assets/css/navbar.css';
// images
import logo from '../../assets/images/logo.png';
// icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../../actions/ContextActions';
import { setAlert, setAuth } from '../../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// context
// import { LOGIN_MODAL } from '../../../store/Types';
// import Store from '../../../store/Context';

export default function Navbar(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [trans, setTrans] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log(window.scrollY);
      if (window.scrollY > 100) {
        setTrans(false);
      } else setTrans(true);
    });
  }, []);
  // function for handle login activity
  function handleLog() {
    if (auth.isAuth) history.push('/profile');
    else {
      history.push('/login');
    }
  }

  function handleLogout() {
    dispatch(setAuth({ isAuth: false }));
    dispatch(
      setAlert({
        open: true,
        variant: 'success',
        message: 'Logged out successfully !!!',
      })
    );
    history.push('/');
  }

  return (
    <>
      <Box className={`navContainer ${!trans && 'bgWhite'}`}>
        {/* Han Icon */}
        <IconButton className="hamIcon" onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
        {/* LOGO  */}
        <Box className="logo" component={Link} to={'/'}>
          <img src={logo} alt="logo" />
        </Box>
        {/* LINKS  */}
        <Box component={List} className="links">
          <Typography variant={'body'} to={'/'} component={Link}>
            Home
          </Typography>
          <Typography variant={'body'} to={'/listing'} component={Link}>
            Courses
          </Typography>
          <Typography variant={'body'} to={'/about'} component={Link}>
            About Us
          </Typography>
          <Typography variant={'body'} to={'/contact'} component={Link}>
            Contact
          </Typography>
          <Typography variant={'body'} to={'/career'} component={Link}>
            Career
          </Typography>
        </Box>
        {/* Button */}
        <Box className="button">
          <IconButton size="small" onClick={handleLog}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          {auth.isAuth && (
            <IconButton
              onClick={handleLogout}
              className="searchBTN"
              size="small"
            >
              <PowerSettingsNewIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Hamburger
        open={open}
        setOpen={setOpen}
        history={history}
        dispatch={dispatch}
        state={auth}
        handleLogout={handleLogout}
      />
    </>
  );
}

function Hamburger({ open, setOpen, history, dispatch, state, handleLogout }) {
  // function for handle login activity
  function handleLog() {
    if (state.isAuth) history.push('/profile');
    else {
      // dispatch({
      //   type: LOGIN_MODAL,
      //   payload: {
      //     open: true,
      //     state: 0,
      //   },
      // });
    }
  }

  function LinkBox() {
    return (
      <>
        <IconButton
          onClick={() => setOpen(false)}
          size="small"
          className="closeBTN"
        >
          <CloseIcon />
        </IconButton>
        <Box className="hamLinkContainer">
          <ul className="ul_formate">
            <Link to="/" className="li_formate">
              Home
            </Link>
            <Link to="/listing" className="li_formate">
              Courses
            </Link>
            <Link to="/about" className="li_formate">
              About Us
            </Link>
            <Link to="/contact" className="li_formate">
              Contact
            </Link>
            <Link to="/career" className="li_formate">
              Career
            </Link>
            <Button
              variant="contained"
              onClick={() => {
                {
                  state.isAuth ? handleLogout() : handleLog();
                }
              }}
              className="logOutBtn"
            >
              {state.isAuth ? 'Logout' : 'Login'}
            </Button>
          </ul>
        </Box>
      </>
    );
  }

  return (
    <>
      <SwipeableDrawer anchor={'left'} open={open}>
        <LinkBox />
      </SwipeableDrawer>
    </>
  );
}
