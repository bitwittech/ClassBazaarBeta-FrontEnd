import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

// images
import signup from '../../assets/images/logIn.png';
import top from '../../assets/images/topVector.png';
import bottom from '../../assets/images/bottomVector.png';

// component
import NavBar from '../utils/Navbar';
import Footer from '../utils/Footer';

// css
import '../../assets/css/signup.css';
import '../../assets/css/utility.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setAuth } from '../../redux/action/action';

// login API
import { newLogin } from '../services/services';

export default function Log_In(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth.isAuth) props.history.push('/');
  }, [auth.isAuth]);

  async function handleLogIn(e) {
    try {
      e.preventDefault();

      let data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      let response = await newLogin(data);

      if (response.status === 200) {
        dispatch(
          setAuth({
            isAuth: true,
            email: response.data.user.email_address,
            name: response.data.user.name,
            mobile_no: response.data.user.mobile_no,
            token: response.data.token,
          })
        );
        dispatch(
          setAlert({
            open: true,
            variant: 'success',
            message: response.message || 'Log In Successfully !!!',
          })
        );
        props.history.push('/');
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: 'error',
            message: response.message || 'User Not Found !!!',
          })
        );
      }
    } catch (err) {
      console.log('err>>', err);
      dispatch(
        setAlert({
          open: true,
          variant: 'error',
          message: 'Something Went Wrong !!!',
        })
      );
    }
  }

  return (
    <>
      <NavBar />
      <Grid container className="signContainer">
        <Grid item xs={12} md={6} className="imageContainer">
          <img src={top} className="topVector" alt="top" />
          <img src={signup} className="mainImage" alt="signup" />
        </Grid>
        {/* // form ======  */}
        <Grid item xs={12} className="signupForm" md={6}>
          <img src={bottom} className="bottomVector" alt="bottom" />
          <Typography variant="h4" className="signTextColor b6">
            Login
          </Typography>
          <Typography
            to="/signup"
            component={Link}
            className="signTextColor"
            variant="body"
          >
            Don't Have An Account? Sign Up
          </Typography>
          <form
            method="post"
            onSubmit={handleLogIn}
            encType="multipart/form-data"
          >
            <FormGroup>
              <FormControlLabel
                className="signTextColor"
                labelPlacement="top"
                control={
                  <TextField
                    type="email"
                    variant="outlined"
                    size="small"
                    name="email"
                  />
                }
                label="Email"
              />
              <FormControlLabel
                className="signTextColor"
                labelPlacement="top"
                control={
                  <TextField
                    type="password"
                    variant="outlined"
                    size="small"
                    name="password"
                  />
                }
                label="Password"
              />
              <Button
                size="medium"
                variant="contained"
                className="signButtonColor"
                type="submit"
              >
                Login
              </Button>
            </FormGroup>
          </form>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
