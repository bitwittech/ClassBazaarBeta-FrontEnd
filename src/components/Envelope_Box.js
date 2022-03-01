
// Popup box the Adversitsing pupose on the banner no. 3
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import React, { useContext, useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../config.json';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
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
    borderRadius: '8px',
    width: '40%',
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
}));

const Envelope_Box = (props) => {

  const [open,setopen] = useState()

  useEffect(() => {
    setopen(true)
  }, []);
 
  const classes = useStyles();

  
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose = {()=>{    setopen(false); props.close();}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, in. Nulla exercitationem provident sequi, qui sunt reprehenderit, consequuntur beatae, eos corrupti laborum nobis architecto voluptas a consectetur itaque atque! Id!
            </Container>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Envelope_Box;