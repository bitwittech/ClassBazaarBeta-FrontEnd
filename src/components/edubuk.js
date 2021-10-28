import AppBar from './AppBar';
import Footer from './Footer';
import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { trackEvent } from 'react-with-analytics/lib/utils';
import anyone from '../assets/anyone.png'
import image1 from '../assets/Image31.png';
import image2 from '../assets/image32.png';
import image3 from '../assets/CLPImage.png';
import image4 from '../assets/Group3.png';
import image5 from '../assets/Image34.png';
import '../styles/edubuk.css';
import axios from 'axios';
import { eduTest } from '../service/commonService';
import { store } from '../App';
import Store from '../store/Context';
import { LOGIN_MODAL } from '../store/Types';

const getUserDetails = (dispatch) => {
  
  store.getItem('user').then(user => {
    if (user == null) {
        dispatch({
          type: LOGIN_MODAL,
          payload: {
            open: true,
            state: 0,
          },
        });
      return ;
    }
    store.getItem('newUserLogin').then((val) => {
      if(val == null) {
        alert('Please login with new user');
      }
      eduTest(user, val);
    })
  });
}


const Edubuk = () => {
  const { state, dispatch } = useContext(Store);
  return (
    <>
      <AppBar noHome={true}/>
        <div className={'landing-page-wrapper'}>
        <section className="edu-banner posiition-relative d-flex align-items-center">
            <div className="overlay"/>
            <div className="banner-content position-relative text-white" style={{zIndex: '2'}}>
            <div style={{ fontSize: '26px', marginLeft: '60px', marginBottom: '18px' }}>
                Powered by Edubuk
            </div>
            <div style={{ marginLeft: '60px' }}>
                <img src={anyone} style={{width: '80%'}} />
            </div>
            </div>
        </section>
        </div>

        <div className="contentEdubook">
            <span className="title">Science, Arts or Commerce? Gone are the days of pursuing stereotyped career paths and we know one size does not fit all! </span><br />
            <span>Today learners want to venture into unconventional career paths out of passion and we are here to guide them in the correct path with the most trusted career mapping test and customised online-cum-offline learning paths which enables the learner to acquire skill-sets required to achieve their chosen career path. Did you know there are 9 types of intelligences and each has more than 20 career paths you could pursue?</span>
        </div>

        <div className="stepMain1">
            <div className="stepSub1">
                {/* <p style={{marginBottom: '450px'}}>Image Needed</p> */}
                <img src={image1} className="stepImg1" />
                <div>
                <span className="step1">Step 1</span><br />
                <span className="identity">Identify your core
                    intelligence type in sync with your passion and each has more than 15 career paths you could pursue</span>
                </div>
            </div>
            <div class="stepMain2">
            {/* <p style={{marginBottom: '450px'}}>Image Needed</p> */}
              <img src={image2} className="stepImg2"/>
              <div>
                <span className="step2">Step 2</span><br />
                <span className="use">Use Edubuk’s proprietary technology to
                    generate Customized Learning Plans personalized to your learner profile </span>
              </div>
            </div>
        </div>

        <div className="maindivcustom">
            {/* <p style={{marginBottom: '91px', textAlign: 'center'}}>Image Needed</p> */}
            <img src={image3} className="customImg"/>
            <span><span style={{fontWeight: 'bold'}}>Customized Learning Plan</span><span> will include online courses from best universities around the 
            world and offline courses which you can pursue from by enrolling in a university or 
            a skill training centre”. “This will also have courses you need to achieve your dream of 
            pursuing an unconventional career paths like becoming a singer, musician, dancer, 
            actor, sportsperson etc</span></span>
        </div>

        <div className="takeCareer">
            <div className="takeCareerInner">
            {/* <p>Image Needed</p> */}
            <img src={image4} className="careerImg"/>
            <span>Take your career interest test for <strong>FREE</strong> effectively with 100% rewards vouchers from Class Bazaar to redeem from any 25,000+ products you like!</span>    
            </div>
        </div>

        <div className="multiple"> 
          <div style={{backgroundColor: '#e6feff'}}>
            <h4 style={{fontWeight:'600', fontSize:'22px', padding: '0 100px'}}>Multiple Intelligence, Interests & Talent (M.I.I.T.)</h4>
            <img className="multipleImg" src={image2}/>
            <p style={{padding: '0px 60px'}}>Based on Harvard University Professor Howard Gardner’s Multiple Intelligence Theory the M.I.I.T test is trusted world across. 
              Its objective is to help each learner map their career paths by identifying their dominant types of intelligences and creating a personalised learner profile with 15 career paths in sync with their talents, interests and passion. 
              There are multiple career paths like becoming a dancer, musician, singer, actor, painter, brand strategist, sportsperson, data scientists, drone pilot, etc.</p>
              <button style={{borderRadius: '2px',backgroundColor: '#086065',border: 'none',color: 'white',padding: '14px 36px 14px 36px',fontSize: '19px',fontWeight: '600'}} onClick={() => getUserDetails(dispatch)}>Take Test</button>
          </div>
          <div className="intelligence"></div>
          <div style={{backgroundColor: '#e6feff',paddingBottom: '30px'}}>
            <h4 style={{fontWeight:'600',  fontSize:'22px', padding: '0 80px'}}>Intelligence Trigon: Multiple Intelligence Test</h4>
            <img src={image5} style={{padding: '50px 50px', width:'80%', maxHeight:'340px', objectFit: 'contain'}}/>
            <p style={{padding: '0px 40px'}}>The Interests Trigon further narrows down on the M.I.I.T. learner profile and suggests 3 most relevant career paths
              for the learner via the widely trusted Edubuk’s deep learning and artificial intelligence system. 
              Furthermore, users have an option to receive a Customized Learning Plan which will offer a combination of best online-cum-offline resources or courses to pursue the desired career path at the most affordable rate. </p>
              <button style={{borderRadius: '2px',backgroundColor: '#086065',border: 'none',color: 'white',padding: '14px 36px 14px 36px',fontSize: '19px',fontWeight: '600'}} onClick={() => getUserDetails(dispatch)}>Take Test</button>
          </div>
        </div>

      
      <div className="orange-band newsletter">
        <div className="inner-orange">
          <Typography
            variant="h6"
            style={{
              color: 'white',
              fontWeight: '500',
              marginBottom: '20px',
            }}
          >
            Never stop learning. Subscribe to our newsletter
          </Typography>
          <div style={{ marginTop: '10px', width: '90%', margin: 'auto' }}>
            <input
              type="email"
              placeholder="Your email"
              className="ns-input"
            />
            <button
              onClick={() => {
                if (this.state.nsEmail !== '') {
                  trackEvent('Newsletter', 'click', 'Newsletter Email');
                }
              }}
              className="ns-submit click-h"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer bgColor={'#FAFAFA'}/>
    </>
  );
};

export default Edubuk;
