import AppBar from './AppBar';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { trackEvent } from 'react-with-analytics/lib/utils';
import bannerImage from '../assets/edubukBanner.png';
import anyone from '../assets/anyone.png'
import image1 from '../assets/Image31.png';
import image2 from '../assets/Image 33.png';
import image3 from '../assets/CLPImage.png';
import image4 from '../assets/Group3.png';
import image5 from '../assets/image32.png';

const Edubuk = () => {
  
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

        <div style={{padding: '60px 140px 41px 140px', color:'#000000'}}>
            <span style={{color: '#f15a29', fontSize: '22px', lineHeight: '1.25', fontWeight: '600'}}>Science, Arts or Commerce? Gone are the days of pursuing stereotyped career paths and we know one size does not fit all! </span><br />
            <span>Today learners want to venture into unconventional career paths out of passion and we are here to guide them in the correct path with the most trusted career mapping test and customised online-cum-offline learning paths which enables the learner to acquire skill-sets required to achieve their chosen career path. Did you know there are 9 types of intelligences and each has more than 20 career paths you could pursue?</span>
        </div>

        <div style={{display: 'flex', backgroundColor: '#ebebeb', opacity: '0.6', padding: '50px 140px 67px'}}>
            <div style={{textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)', borderRadius: '13px', padding: '24px 24px 16px 13px', margin: '0 69px 0 0', width: '778px', height: '632px'}}>
                {/* <p style={{marginBottom: '450px'}}>Image Needed</p> */}
                <img src={image1} style={{width:'400px'}} />
                <span style={{fontSize: '24px', fontWeight: '600', color: '#159fa7'}}>Step 1</span><br />
                <span style={{fontSize: '16px', color: '#000000', padding: '15px 30px 10px 30px'}}>Identify your core
                    intelligence type in sync with your passion and each has more than 15 career paths you could pursue</span>
            </div>
            <div style={{textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)', borderRadius: '13px', padding: '24px 24px 16px 13px', margin: '0 69px 0 0', width: '778px', height: '632px'}}>
            {/* <p style={{marginBottom: '450px'}}>Image Needed</p> */}
              <img src={image2} style={{width:'400px'}}/>
                <span style={{fontSize: '24px', fontWeight: '600', color: '#159fa7'}}>Step 2</span><br />
                <span style={{fontSize: '16px', color: '#000000', padding: '15px 30px 10px 30px'}}>Use Edubuk’s proprietary technology to
                    generate Customized Learning Plans personalized to your learner profile </span>
            </div>
        </div>

        <div style={{margin: '46px 88px 46px 91px'}}>
            {/* <p style={{marginBottom: '91px', textAlign: 'center'}}>Image Needed</p> */}
            <img src={image3} style={{width:'100%'}}/>
            <span><span style={{fontWeight: 'bold'}}>Customized Learning Plan</span><span> will include online courses from best universities around the 
            world and offline courses which you can pursue from by enrolling in a university or 
            a skill training centre”. “This will also have courses you need to achieve your dream of 
            pursuing an unconventional career paths like becoming a singer, musician, dancer, 
            actor, sportsperson etc</span></span>
        </div>

        <div style={{backgroundColor: '#fff3ef', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '40%', marginTop: '35px', marginBottom: '35px'}}>
            {/* <p>Image Needed</p> */}
            <img src={image4} style={{width:'100%', marginBottom:'40px'}}/>
            <span>Take your career interest test for <strong>FREE</strong> effectively with 100% rewards vouchers from Class Bazaar to redeem from any 25,000+ products you like!</span>    
            </div>
        </div>

        {/* <div style={{backgroundColor: '#e6feff', textAlign: 'center', display: 'flex', justifyContent: 'center'}}> 
          <div style={{backgroundColor: '#e6feff'}}>
            <span>Multiple Intelligence, Interests & Talent (M.I.I.T.)</span>
            <img src={image5} />
            <span>Based on Harvard University Professor Howard Gardner’s Multiple Intelligence Theory the M.I.I.T test is trusted world across. 
              Its objective is to help each learner map their career paths by identifying their dominant types of intelligences and creating a personalised learner profile with 15 career paths in sync with their talents, interests and passion. 
              There are multiple career paths like becoming a dancer, musician, singer, actor, painter, brand strategist, sportsperson, data scientists, drone pilot, etc.</span>
          </div>
          <div style={{backgroundColor: '#e6feff'}}>
            <span>Multiple Intelligence, Interests & Talent (M.I.I.T.)</span>
            <img src={image5} />
            <span>Based on Harvard University Professor Howard Gardner’s Multiple Intelligence Theory the M.I.I.T test is trusted world across. 
              Its objective is to help each learner map their career paths by identifying their dominant types of intelligences and creating a personalised learner profile with 15 career paths in sync with their talents, interests and passion. 
              There are multiple career paths like becoming a dancer, musician, singer, actor, painter, brand strategist, sportsperson, data scientists, drone pilot, etc.</span>
          </div>
        </div> */}

      
      <div className="orange-band" style={{ padding: '50px 20px' }}>
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
