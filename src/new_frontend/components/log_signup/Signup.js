import React, { useEffect, useState } from 'react';
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
import signup from '../../assets/images/signup.png';
import top from '../../assets/images/topVector.png';
import bottom from '../../assets/images/bottomVector.png';

// css
import '../../assets/css/signup.css';
import '../../assets/css/utility.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setAuth } from '../../redux/action/action';
import { verifyEmail } from '../services/services';

// components
import NavBar from '../utils/Navbar';
import Footer from '../utils/Footer';

export default function Signup(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth.isAuth) props.history.push('/');
  }, [auth.isAuth]);

  function handleValue(e) {
    console.log(e.target);
    // if (e.target.name === 'mobile') {
    //   if (e.target.value.length < 10 || e.target.value.length > 10) {
    //     setError({ [e.target.name]: true });
    //   } else {
    //     setError({ mobile: false });
    //     setValues((old) => ({ ...old, mobile: e.target.value }));
    //   }
    // } else
    // setValues((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let Values = {
        email_address: e.target.email_address.value,
        password: e.target.password.value,
        mobile_no: e.target.mobile_no.value,
        username: e.target.username.value,
      };
      let response = await verifyEmail(Values);

      if (response.status === 200) {
        console.log(response);
        dispatch(
          setAlert({
            open: true,
            variant: 'success',
            message:
              response.message || 'Verification mail has been dispatched.',
          })
        );
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: 'error',
            message: 'May be cred were already in use?',
          })
        );
      }
    } catch (err) {
      console.log('error >>', err);
      dispatch(
        setAlert({
          open: true,
          message: 'something went wrong',
          variant: 'error',
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
            Sign Up
          </Typography>
          <Typography
            to="/login"
            component={Link}
            className="signTextColor"
            variant="body"
          >
            Already Have An Account? Login
          </Typography>
          <form
            method="post"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <FormGroup>
              <FormControlLabel
                className="signTextColor"
                labelPlacement="top"
                control={
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    required
                    name="username"
                    onChange={handleValue}
                  />
                }
                label="Username"
              />
              <FormControlLabel
                className="signTextColor"
                labelPlacement="top"
                control={
                  <TextField
                    type="email_address"
                    variant="outlined"
                    size="small"
                    required
                    name="email_address"
                    onChange={handleValue}
                  />
                }
                label="Email"
              />
              <FormControlLabel
                className="signTextColor"
                labelPlacement="top"
                control={
                  <TextField
                    type="number"
                    variant="outlined"
                    onChange={handleValue}
                    size="small"
                    required
                    name="mobile_no"
                  />
                }
                label="Mobile"
              />
              <FormControlLabel
                className="signTextColor"
                labelPlacement="top"
                control={
                  <TextField
                    type="password"
                    required
                    variant="outlined"
                    onChange={handleValue}
                    size="small"
                    name="password"
                  />
                }
                label="Password"
              />
              <Button
                size="medium"
                variant="contained"
                type="submit"
                className="signButtonColor"
              >
                SignUp
              </Button>
            </FormGroup>
          </form>
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
}
