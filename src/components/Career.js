import AppBar from './AppBar';
import Footer from './Footer';
import {
  Grid,
  CardContent,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import Store from '../store/Context';
import axios from 'axios';
import { trackEvent } from 'react-with-analytics/lib/utils';
import bannerImage from '../assets/carrer.png';
import meetUp from '../assets/img/formImage.svg';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(() => ({
  cardGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70px',
    marginBottom: '100px',
    gap: '50px',
  },
  formGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    display: 'grid',
  },
  buttonGrid: {
    gap: '10px',
    display: 'grid',
  },
  card: {
    borderTop: '5px solid orange',
    boxShadow: '0px 0px 3px 0px #dddbdb',
  },
  topHeading: {
    textAlign: 'center',
  },
  img: {
    maxWidth: '-webkit-fill-available',
  },
  uploadBtn: {
    display: 'contents',
  },
}));

const Career = () => {
  const profileCatelog = [
    {
      value: 'React Developer',
      label: 'React Developer',
    },
    {
      value: 'BlockChain Developer',
      label: 'BlockChain Developer',
    },
    {
      value: 'Human Resource Manage',
      label: 'Human Resource Manage',
    },
  ];

  const [profile, setProfile] = useState();
  const [file, setFile] = useState(' ');

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0].name);
  };
  const handleChangeProfile = (e) => {
    setProfile(e.target.value);
  };

  const styles = useStyles();

  const [data, setData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const { state, dispatch } = useContext(Store);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://api.classbazaar.com/api/contact';
    const res = await axios.post(url, data);
    setData({
      ...data,
      name: '',
      email: '',
      message: '',
      subject: '',
    });
    if (res.status === 200) {
      dispatch({
        type: 'ALERT',
        payload: {
          varient: 'success',
          message: 'Message sent',
        },
      });
    } else {
      dispatch({
        type: 'ALERT',
        payload: {
          varient: 'info',
          message: 'Unable to deliver your message',
        },
      });
    }
  };

  return (
    <>
      <AppBar noHome={true} />
      <div
        style={{
          height: '70vh',
          backgroundPosition: 'center',
          background: `linear-gradient(rgb(72 0 72 / 15%), rgb(255 114 0 / 28%)), url(${bannerImage})`,
          paddingTop: '150px',
        }}
        className={'contact-banner'}
      >
        <div className="container">
          <Typography
            style={{
              fontWeight: '900',
              fontSize: '2.2rem',
              marginBottom: '0px',
              color: 'white',
            }}
            variant="h6"
            gutterBottom
          >
            Join Us
          </Typography>
          <Typography
            variant="h6"
            className="contact-cont"
            style={{
              color: 'white',
              fontWeight: '300',
              maxWidth: '500px',
            }}
            gutterBottom
          >
            You can leave us a message below and our team will get back to you
            or you can directly email us at{' '}
            <a
              href="mailto:info@classbazaar.com?"
              style={{ color: 'white !important' }}
            >
              info@classbazaar.com
            </a>
          </Typography>
        </div>
      </div>

      {/* Opportunities Section ==================================================  */}

      <Grid container className={`${styles.cardGrid}`}>
        <Grid item xs={12} className={`${styles.topHeading}`}>
          <Typography variant={'h4'}>Opportunities</Typography>
        </Grid>

        <Grid item xs={8} md={3}>
          <CardContent className={`${styles.card}`}>
            <Typography variant={'Button'}>Opportunities 1</Typography>
          </CardContent>
          {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
        </Grid>

        <Grid item xs={8} md={3}>
          <CardContent className={`${styles.card}`}>
            <Typography variant={'Button'}>Opportunities 1</Typography>
          </CardContent>
          {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
        </Grid>

        <Grid item xs={8} md={3}>
          <CardContent className={`${styles.card}`}>
            <Typography variant={'Button'}>Opportunities 1</Typography>
          </CardContent>
          {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
        </Grid>
      </Grid>

      {/* Form Section ==================================================  */}

      <Grid container className={`${styles.cardGrid}`}>
        <Grid item xs={12} className={`${styles.topHeading}`}>
          <Typography variant={'h4'}>Apply Now</Typography>
        </Grid>

        <Grid item xs={8} md={4}>
          <img className={styles.img} src={meetUp} alt="Meet Up image" />
        </Grid>

        {/* // Feilds  */}
        <Grid item xs={12} md={4}>
          <form action="">
            <Grid container className={`${styles.formGrid}`}>
              {/* name,email,phone no, experience, profile, upload resume */}
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  small
                  name="applicant_name"
                  label="Name"
                  type="text"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '17px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  small
                  label="Email"
                  name="applicant_email"
                  type="email"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '17px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  small
                  name="applicant_number"
                  type="number"
                  label="Phone Number"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '17px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  small
                  name="applicant_experience"
                  type="number"
                  label="experience"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '17px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '17px 10px 10px',
                    },
                  }}
                  select
                  label="Profile"
                  value={profile}
                  onChange={handleChangeProfile}
                  helperText="Please select the post for which you are applying ."
                >
                  {profileCatelog.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Grid container className={`${styles.buttonGrid}`}>
                  <input
                    accept="application/pdf"
                    className={styles.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    onChange={handleFileChange}
                    type="file"
                  />
                  <Grid item xs={12}>
                    <TextField
                      id="filled"
                      variant="filled"
                      inputProps={{
                        style: {
                          padding: '17px 10px 10px',
                        },
                      }}
                      small
                      label="Resume"
                      value={file || 'PDF format is acceptable only !!!'}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} className={styles.uploadBtn}>
                    <label
                      color="success"
                      fullWidth
                      htmlFor="raised-button-file"
                    >
                      <Button
                        fullWidth
                        startIcon={<AssignmentIndIcon />}
                        color="success"
                        variant="contained"
                        component="span"
                      >
                        Upload Resume
                      </Button>
                    </label>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  startIcon={<CheckCircleIcon />}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {/* Footter Section ==================================================  */}

      <Footer bgColor={'#FAFAFA'} />
    </>
  );
};

export default Career;
