import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const ForgotPassword = ({ openState, handlePopupClose }) => {
  const classes = useStyles();
  return (
    <div>
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
                style={{
                  color: '#000000',
                  fontWeight: '900',
                  fontSize: '1rem',
                }}
                align="center"
                variant="h5"
                gutterBottom
                className="home-modal-text"
              >
                Forgot Password?
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
                    Email ID
                  </Typography>
                  <input
                    name="email"
                    type="text"
                    className="text-field w-l w-m"
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
                <Typography
                  style={{
                    color: '#000000',
                    fontWeight: '900',
                    fontSize: '1rem',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                  align="center"
                  variant="h5"
                  gutterBottom
                  className="home-modal-text"
                >
                  Check your email <br />
                  for further process!
                </Typography>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default ForgotPassword;
