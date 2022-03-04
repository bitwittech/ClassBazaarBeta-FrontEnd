
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import pop from '../assets/img/popUp.jpg';



const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
                          
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: '8px',
    width: '40vw',
    margin: '0%',
    padding:'0%'
  },
 
  Img:{
    width : '100%'
  }
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
        onClose = {()=>{    setopen(false);  sessionStorage.setItem('show',true); props.close();}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={open}>
          <div className={classes.paper}  className  = 'paperModal'>
           
            <Container maxWidth="sm" className = "resetContainer">
          {/* <IconButton aria-label="close" className={classes.closeButton} onClick={ ()=>{setopen(false);  sessionStorage.setItem('show',true); props.close();}}>
          <CloseIcon />
        </IconButton>
        <br/> */}
        <img src={pop} className = {classes.Img} alt="Offer Banner " srcset="" />

            </Container>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Envelope_Box;
