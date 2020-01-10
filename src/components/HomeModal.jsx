import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Rating from '@material-ui/lab/Rating';
// import { Rating } from '@material-ui/lab';
import React, { useState, useContext } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Store from '../store/Context';
import axios from 'axios';
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ''}>
      <span {...other} />
    </Tooltip>
  );
}
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '8px',
    width: '40%',
    margin: '0',
    color: 'white',
    padding: '60px',
    outline: 'none',
    paddingTop: '30px',
  },
  rating1: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    margin: theme.spacing(1),
    padding: '10px 20px',
    width: '30%',
    textTransform: 'none',
  },
}));

const HomeModal = ({
  openState,
  handlePopupClose,
  state,
  course,
  provider,
  uuid,
}) => {
  const classes = useStyles();

  //Home made modal
  const HomeMessage = () => (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="home-modal"
        onClose={handlePopupClose}
        open={openState}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openState}>
          <div
            style={{ backgroundColor: 'white' }}
            className="home-modal-paper"
          >
            <Typography
              style={{ color: '#000000', fontWeight: '900', fontSize: '1rem' }}
              align="center"
              variant="h5"
              gutterBottom
              className="home-modal-text"
            >
              Stay ahead of the curve! Get personalized course recommendations,
              track subjects and more.
            </Typography>
            <Grid
              align="center"
              className="home-modal-field"
              style={{ marginTop: '40px' }}
            >
              <form>
                <Typography
                  style={{
                    fontWeight: '900',
                    fontSize: '12px',
                    marginTop: '20px',
                  }}
                  color="primary"
                  variant="subtitle1"
                  gutterBottom
                >
                  Full Name
                </Typography>
                <input
                  name="name"
                  type="text"
                  className="text-field w-l"
                  placeholder="Enter your Name"
                />
                <Typography
                  style={{
                    fontWeight: '900',
                    fontSize: '12px',
                    marginTop: '20px',
                  }}
                  color="primary"
                  variant="subtitle1"
                  gutterBottom
                >
                  Email ID
                </Typography>
                <input
                  name="email"
                  type="text"
                  className="text-field w-l"
                  placeholder="Enter your Email ID"
                />
                <div style={{ marginTop: '20px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.loginButton}
                    className="btn-mobile"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
  const ReviewModalTypo = text => (
    <Typography
      style={{
        fontWeight: '900',
        fontSize: '12px',
        marginTop: '20px',
        color: 'black',
      }}
      variant="subtitle1"
      gutterBottom
    >
      {text}
    </Typography>
  );
  const ReviewForm = (course, provider, uuid) => {
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('cbtoken');
    const [value, setValue] = React.useState(0);
    const [finished, setFinished] = React.useState('Doing Right Now');
    const handleChange = e => {
      setMessage(e.target.value);
    };
    const classes = useStyles();
    console.log('UUID', uuid);
    const handleSubmit = async e => {
      e.preventDefault();
      console.log(message, finished, value, uuid);
      const body = JSON.stringify({
        review: message,
        token: token,
        courseID: uuid,
        provider,
        rating: value,
        status: finished,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const res = await axios.post(
          'https://api.classbazaar.in/api/review',
          body,
          config
        );
        console.log('STATUS', res);
        handlePopupClose();
      } catch (error) {
        console.log(error);
      }
    };
    console.log(provider, uuid, token);
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          onClose={handlePopupClose}
          open={openState}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openState}>
            <div className="review-modal">
              <Typography
                style={{ fontSize: '1.1rem', fontWeight: '600' }}
                variant="h6"
                gutterBottom
              >
                <span style={{ color: '#000' }}>Add a review for </span>
                <span style={{ color: '#FFA502' }}> {course}</span>
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid>
                  {ReviewModalTypo('1) How would you rate this course?')}
                  <Rating
                    name="hover-tooltip"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    precision={0.5}
                    IconContainerComponent={IconContainer}
                  />
                  {ReviewModalTypo('2) Have you completed the course?')}
                  <div className="flex">
                    <div>
                      <button
                        onClick={() => setFinished('Doing Right Now')}
                        className={
                          finished === 'Doing Right Now'
                            ? 'r-tgg-btn r-tgg'
                            : 'r-tgg-btn'
                        }
                      >
                        Doing Right Now
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setFinished('Completed')}
                        className={
                          finished === 'Completed'
                            ? 'r-tgg-btn r-tgg'
                            : 'r-tgg-btn'
                        }
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                  {ReviewModalTypo('3) Write your review')}

                  <textarea
                    value={message}
                    onChange={handleChange}
                    style={{ width: '100%', height: '90px' }}
                    name="review"
                    className="text-field"
                    required
                    placeholder="What did you like or dislike? How could this course improve?"
                  />
                  <div style={{ marginTop: '10px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="enroll-btn"
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  };
  const switchRender = (course, provider, uuid) => {
    switch (state) {
      case 0:
        return HomeMessage();
      case 1:
        return ReviewForm(course, provider, uuid);
      default:
        return HomeMessage();
    }
  };

  return <>{switchRender(course, provider, uuid)}</>;
};

export default HomeModal;
