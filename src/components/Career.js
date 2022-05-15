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
import { submitResume } from '../service/commonService';

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
    padding: '5px 20px 0px 20px',
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
      value: 'UI/UX Designer',
      label: 'UI/UX Designer',
    },
    {
      value: 'Business Development Associate',
      label: 'Business Development Associate',
    },
  ];

  const [jobPost, setJobPost] = useState([
    {
      title: 'UI/UX designer',
      siniority: '0-5',
      location: 'Jaipur, Rajsthan',
      package: '2-5',
    },

    {
      title: 'Business Dev Associate',
      siniority: '0-5',
      location: 'Jaipur, Rajsthan',
      package: '2-5',
    },
  ]);

  const [profile, setProfile] = useState();
  const [file, setFile] = useState(' ');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('name', e.target.applicant_name.value);
    FD.append('email', e.target.applicant_email.value);
    FD.append('contact', e.target.applicant_number.value);
    FD.append('profile', profile);
    FD.append('experience', e.target.applicant_experience.value);
    FD.append('resume', e.target.resume.files[0]);

    for (var value of FD.values()) {
      console.log(value);
    }

    const res = submitResume(FD);

    res
      .then((res) => {
        dispatch({
          type: 'ALERT',
          payload: {
            varient: 'success',
            message: 'Your has been submitted !!!',
          },
        });
        setFile('');
        setProfile('');
        document.getElementById('form').reset();
      })
      .catch((err) => {
        dispatch({
          type: 'ALERT',
          payload: {
            varient: 'error',
            message: 'Somthing went worang !!!',
          },
        });
      });
  };

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

  return (
    <>
      <AppBar noHome={true} />
      <div
        style={{
          height: '70vh',
          backgroundPosition: 'center',
          background: `linear-gradient(rgb(72 0 72 / 15%), rgb(255 114 0 / 28%)), url(${bannerImage})`,
          paddingTop: '150px',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
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
            You can leave us a application below and our team will get back to
            you or you can directly email us at{' '}
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

        {jobPost.map((post) => (
          <Grid item xs={8} md={3}>
            <CardContent className={`${styles.card}`}>
              <Typography variant={'h5'}>{post.title}</Typography>
              <br></br>
              <Typography variant={'caption'}>
                Siniority : {post.siniority} years
              </Typography>
              <br></br>
              <Typography variant={'caption'}>
                Package : {post.package} LPA
              </Typography>
              <br></br>
              <Typography variant={'caption'}>
                Location : {post.location}
              </Typography>
            </CardContent>
          </Grid>
        ))}
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
          <form
            id="form"
            action=""
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
            method="post"
          >
            <Grid container className={`${styles.formGrid}`}>
              {/* name,email,phone no, experience, profile, upload resume */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="filled-basic"
                  required
                  small
                  name="applicant_name"
                  label="Name"
                  type="text"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '25px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="filled-basic"
                  small
                  required
                  label="Email"
                  name="applicant_email"
                  type="email"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '25px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="filled-basic"
                  small
                  error={false}
                  required
                  name="applicant_number"
                  type="number"
                  label="Phone Number"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '25px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="filled-basic"
                  small
                  required
                  name="applicant_experience"
                  type="number"
                  label="experience"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '25px 10px 10px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="filled"
                  variant="filled"
                  inputProps={{
                    style: {
                      padding: '25px 10px 10px',
                    },
                  }}
                  select
                  required
                  name="profile"
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
                    name="resume"
                    required
                    onChange={handleFileChange}
                    type="file"
                  />
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="filled"
                      variant="filled"
                      inputProps={{
                        style: {
                          padding: '25px 10px 10px',
                        },
                      }}
                      disabled
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
