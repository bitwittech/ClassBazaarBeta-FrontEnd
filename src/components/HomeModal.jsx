import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
  },
  loginButton: {
    margin: theme.spacing(1),
    padding: '10px 20px',
    width: '30%',
    textTransform: 'none',
  },
}));

const HomeModal = ({ openState, handlePopupClose, state }) => {
  const classes = useStyles();

  //Home made modal
  const HomeMessage = () => (
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
          <div style={{ backgroundColor: 'white' }} className={classes.paper}>
            <Typography
              style={{ color: '#000000', fontWeight: '900', fontSize: '1rem' }}
              align="center"
              variant="h5"
              gutterBottom
            >
              Stay ahead of the curve! Get personalized course recommendations,
              track subjects and more.
            </Typography>
            <Grid align="center" style={{ marginTop: '40px' }}>
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
                  className="text-field"
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
                  className="text-field"
                  placeholder="Enter your Email ID"
                />
                <div style={{ marginTop: '20px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.loginButton}
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
  const ReviewForm = () => (
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
          <div className={classes.paper}>
            <Typography
              color="primary"
              align="center"
              variant="h5"
              gutterBottom
            >
              Create Review
            </Typography>

            <Grid align="center">
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
                  Add a headline
                </Typography>
                <input
                  name="headline"
                  type="text"
                  className="text-field"
                  placeholder="What's most important to know?"
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
                  Write your review
                </Typography>
                <textarea
                  name="review"
                  className="text-field"
                  placeholder="What did you like or dislike? How could this course improve?"
                />
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.loginButton}
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
  const switchRender = () => {
    switch (state) {
      case 0:
        return HomeMessage();
      case 1:
        return ReviewForm();
      default:
        return HomeMessage();
    }
  };

  return <>{switchRender()}</>;
};

export default HomeModal;
