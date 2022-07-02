import React, { useContext, useState, useEffect } from 'react';
// import { Popup } from 'jso';
import {
  register,
  signin,
  googleLogin,
  updateEDUData,
} from '../actions/ContextActions';
import config from '../config.json';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { EdubukFrom } from '../store/Types';
import Modal from '@material-ui/core/Modal';
import Store from '../store/Context';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { trackEvent } from 'react-with-analytics';
import { GoogleLogin } from 'react-google-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    'overflow-y': 'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: '8px',
    width: '40vw',
    margin: '0',
  },
  button: {
    padding: '10px 20px',
    textTransform: 'none',
  },
  loginButton: {
    margin: theme.spacing(1),
    padding: '10px 20px',
    width: '30%',
    textTransform: 'none',
  },
  input: {
    display: 'none',
  },
  social: {
    padding: '10px 20px',
    textTransform: 'none',
  },
  closeButton: {
    position: 'relative',
    left: '90%',
    color: theme.palette.grey[500],
  },
}));

const EdubukForm = () => {
  const { state, dispatch } = useContext(Store);
  const { edubukFrom } = state;
  const classes = useStyles();
  const [modal, setModal] = useState({
    state: 0, //0 - Login 1-Signup
    formData: {
      username: '',
      password: '',
      phone: '',
      email: '',
      school: '',
      city: '',
      gender: '',
      classYear: '',
      // refferral : '',
    },
    errors: {
      username: null,
      password: null,
      phone: null,
      email: null,
      school: null,
      city: null,
      gender: null,
      class: null,
    },
  });
  console.log(edubukFrom);

  useEffect(() => {
    setModal({ ...modal, state: edubukFrom.state });
  }, []);
  console.log(modal.state);

  const handleClose = () => {
    dispatch({
      type: EdubukFrom,
      payload: {
        state: edubukFrom.state,
        open: false,
      },
    });
  };

  const setGender = (e) => {
    modal.formData.gender = e.target.value;
  };

  const setClassYear = (e) => {
    modal.formData.classYear = e.target.value;
    console.log(modal.formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errors = modal.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    const phoneRegex = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
    switch (name) {
      case 'phone':
        errors.phone = phoneRegex.test(value) ? '' : 'Invalid phone';
        break;

      case 'gender':
        errors.gender = !value.toString() ? '' : 'Gender required';
        break;

      case 'classYear':
        errors.classYear = !value.toString() ? '' : 'Class required';
        break;

      case 'city':
        errors.city = !value.toString().trim().length ? 'City required' : '';
        break;

      case 'school':
        errors.school = !value.toString().trim().length
          ? 'School required'
          : '';
        break;
      default:
        break;
    }
    setModal({
      ...modal,
      formData: {
        ...modal.formData,
        [e.target.name]: e.target.value,
      },
    });
    // console.log("==="+modal.formData.refferral);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateEDUData(modal.formData, dispatch);

    setModal({
      ...modal,
      formData: {
        username: '',
        password: '',
        phone: '',
        email: '',
      },
    });
  };

  console.log('STATE', state.loading);
  const responseGoogle = (res) => {
    console.log(res);
    googleLogin(res, dispatch);
    trackEvent('social-icon', 'click', 'google');
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={edubukFrom.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={edubukFrom.open}>
          <div className={classes.paper} className="paperModal">
            <Container maxWidth="sm">
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon />
              </IconButton>
              <br />
              <Typography component="div" align="center">
                <Typography
                  style={{
                    fontWeight: '600',
                    fontSize: '12px',
                    color: '#888888',
                  }}
                  variant="subtitle1"
                  gutterBottom
                >
                  Please enter all the required feilds to attempt following
                  test.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <>
                    {' '}
                    <Typography
                      style={{
                        fontWeight: '900',
                        fontSize: '12px',
                        marginTop: '6px',
                      }}
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      Mobile Number
                    </Typography>
                    <input
                      type="text"
                      name="phone"
                      value={modal.formData.phone}
                      onChange={handleChange}
                      className="text-field"
                      placeholder="Enter your number"
                      required
                    />
                    <div className="color-red">{modal.errors.phone}</div>
                  </>

                  <>
                    {' '}
                    <Typography
                      style={{
                        fontWeight: '900',
                        fontSize: '12px',
                        marginTop: '6px',
                      }}
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      Gender
                    </Typography>
                    <select className="select-box" onChange={setGender}>
                      <option value="">--Select Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </>

                  <>
                    {' '}
                    <Typography
                      style={{
                        fontWeight: '900',
                        fontSize: '12px',
                        marginTop: '6px',
                      }}
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      Class
                    </Typography>
                    <select className="select-box" onChange={setClassYear}>
                      <option value="">--Select Class/Year--</option>
                      <option value="class_6">Class - 6</option>
                      <option value="class_7">Class - 7</option>
                      <option value="class_8">Class - 8</option>
                      <option value="class_9">Class - 9</option>
                      <option value="class_10">Class - 10</option>
                      <option value="class_11">Class - 11</option>
                      <option value="class_12">Class - 12</option>
                      <option value="college_1">Year - 1</option>
                      <option value="college_2">Year - 2</option>
                      <option value="college_3">Year - 3</option>
                      <option value="college_4">Year - 4</option>
                      <option value="college_5">Year - 5</option>
                    </select>
                  </>

                  <>
                    {' '}
                    <Typography
                      style={{
                        fontWeight: '900',
                        fontSize: '12px',
                        marginTop: '6px',
                      }}
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      School Name
                    </Typography>
                    <input
                      name="school"
                      value={modal.formData.school}
                      type="text"
                      className="text-field"
                      onChange={handleChange}
                      placeholder="Enter your School Name"
                    />
                    <div className="color-red">{modal.errors.school}</div>
                  </>

                  <>
                    {' '}
                    <Typography
                      style={{
                        fontWeight: '900',
                        fontSize: '12px',
                        marginTop: '6px',
                      }}
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      City
                    </Typography>
                    <input
                      name="city"
                      value={modal.formData.city}
                      type="text"
                      className="text-field"
                      onChange={handleChange}
                      placeholder="Enter your City"
                    />
                    <div className="color-red">{modal.errors.city}</div>
                  </>

                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.loginButton}
                  >
                    {!state.loading ? (
                      'Register'
                    ) : (
                      <CircularProgress color="white" size={'1.5rem'} />
                    )}
                  </Button>
                </form>
              </Typography>
            </Container>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default EdubukForm;
