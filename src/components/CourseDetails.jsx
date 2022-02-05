import { Container, Grid, Typography } from '@material-ui/core';
import { CourseraCourse, CourseraDegree } from '../utils/Coursera';
import React, { useContext, useEffect, useState } from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import AppBar from './AppBar';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Footer from './Footer';
import HomeModal from './HomeModal';
import { Link } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Logo from '../assets/logo.png';
import MobileTopbar from './MobileTopbar';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ReactGA from 'react-ga';
import Rupee from '../assets/rupee.svg';
// import Dollar from '../assets/dollar.svg';
import SchoolIcon from '@material-ui/icons/School';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarRatings from 'react-star-ratings';
import Store from '../store/Context';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import { addBookmark } from '../actions/ContextActions';
import axios from 'axios';
import formatDate from './../utils/dateUtils';
import getClosestNextRun from './../utils/edxUtils';
import { trackEvent } from 'react-with-analytics/lib/utils';

let count = 0 
const formatPrice = price => {
  if (!price || price === null || price === undefined) return 'Free';
  else return Math.round(price);
};

const formatDuration = duration => {
  if (!duration || duration === null || duration === undefined)
    return 'Self Paced';
  else return duration;
};

const CourseDetails = props => {

  // Gstate stand for globale state 

  const [Gstate, setState] = useState({
    data: null,
    summaryData: null,
    loading: true,
    popUp: false,
    reviews: [],
    q: '',
    rloading: true,
  });
  
  const { state, dispatch } = useContext(Store);
  
  const handleBookmark = (uuid, provider, name) => {
    trackEvent(
      'Bookmarked_details',
      'click',
      `${provider}|${Gstate.data && Gstate.data.title}`,
    );


    console.log(uuid, provider);


    if (state.user === null) {
      return dispatch({
        type: 'ALERT',
        payload: {
          varient: 'info',
          message: 'Please login ',
        },
      });
    }

    const userId = state.user.id;
    const courseId = uuid;
    const user = state.user;

    addBookmark(courseId, userId, user, provider, dispatch);
  };

  console.log(props,']=============================');

  const isBookmarked = uuid => {
    console.log('isbookmarked', uuid);
    if (state.user === null || state.user.data === undefined) {
      return false;
    }
    const globalBookmarks = state.user.data.bookmarks;
    if (globalBookmarks.find(e => e.id === uuid) === undefined) {
      return false;
    } else {
      return true;
    }
  };

  // const provider = props.location.pathname.split('/')[2];
  // let uuid = props.location.pathname.split('/')[3];

  const uuid = props.match.params.uuid;

  const provider = props.match.params.provider;
  
  
  useEffect(() => {
    window.scrollTo(0, 0);

    const getCourseDetails = async () => {
      const token = localStorage.getItem('cbtoken');
      const body = JSON.stringify({
        token: token,
        courseID: uuid,
        provider,
      });
      console.log('TOKEN', token);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      var url = `https://api.classbazaar.com/api/course?uuid=${uuid}&provider=${provider}`;

      // var url = `http://localhost:8080/api/course?uuid=${uuid}&provider=${provider}`;
     
      console.log(url, uuid);
      
      const res = await fetch(url);
      const data = await res.json();
      
      console.log('dataUdemy',data.summaryData);

      const reviews = await axios.post(
        'https://api.classbazaar.com/api/review/course',
        body,
        config,
      );
      setState({
        ...Gstate,
        data: data.data,
        loading: false,
        reviews: reviews.data.data,
        rloading: false,
        description: data.summaryData.description,
        isFlexible : data.summaryData.is_flexible,
        price: data.summaryData.price,
        price_currency: data.summaryData.price_currency,
        provider: data.summaryData.provider,
        time : data.summaryData.start_date,
        title: data.summaryData.title,
        url: data.summaryData.url
      });
    };

    getCourseDetails();
  }, []);

  // review section not in need 
  // const reviewSection = (ratingNumber, noOfReviews) => {
  //   console.log({ ratingNumber, noOfReviews });
  //   return (
  //     <>
  //       {isBookmarked(Gstate.data._id) ? (
  //         <TurnedInIcon
  //           onClick={() => handleBookmark(uuid, provider)}
  //           color="primary"
  //           className="click-h"
  //           fontSize="large"
  //         />
  //       ) : (
  //         <TurnedInNotIcon
  //           onClick={() => handleBookmark(uuid, provider)}
  //           color="primary"
  //           fontSize="large"
  //           className="click-h"
  //         />
  //       )}

  //       <Typography
  //         variant="caption"
  //         display="block"
  //         style={{ color: '#898989' }}
  //         gutterBottom
  //       >
  //         {noOfReviews >= 0 && ratingNumber && (
  //           <>{`${Math.round(ratingNumber * 10) /
  //           10}(${noOfReviews} reviews)`}</>
  //         )}
  //         {noOfReviews < 0 && ratingNumber && (
  //           <>{`${Math.round(ratingNumber * 10) / 10}`}</>
  //         )}
  //         {noOfReviews >= 0 && !ratingNumber && <>{`${noOfReviews} reviews`}</>}
  //       </Typography>
  //       {ratingNumber && (
  //         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  //           <StarRatings
  //             rating={ratingNumber}
  //             starRatedColor="#f15a29"
  //             numberOfStars={5}
  //             starDimension="20px"
  //             starSpacing="0px"
  //             name="rating"
  //           />
  //         </div>
  //       )}
  //     </>
  //   );
  // };
  
  // const handlePopupClose = () => {
  //   setState({ ...Gstate, popUp: false });
  // };

//modifyed by Yashwant Sahu


const courseSummary = () =>
    Gstate && (
      <>
        <div
          style={{
            background: '#fff',
            padding: '20px',
            paddingLeft: '40px',
          }}
          className="cd-card"
        >
          <Typography
            style={{ fontWeight: '600', fontSize: '22px' }}
            variant="subtitle2"
            color="primary"
            gutterBottom
          >
            <div style={{ color: '#444444', borderBottom: '2px solid #f15a29', padding: '5px', display: 'inline' }}>
              At a Glance
            </div>
          </Typography>
          <div className="d-flex" style={{ flexDirection: 'column', marginTop: '25px' }}>
            <div style={{ display: 'flex' }}>
              <div>
                <QueryBuilderIcon color="secondary"/> &nbsp;
              </div>
              {Gstate.is_Flexible !== null ?<div>Flexible Timing </div>:<div>Null Week</div>}
           </div>
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <div>
                <DateRangeIcon color="secondary"/> &nbsp;
              </div>
              {Gstate.time !== null ?<div>{Gstate.time.split('T')[0]}</div>:<div>Scheduled</div>}
            </div>

            <div style={{ display: 'flex', marginTop: '15px' }}>
              <div>
                <img src={Rupee} alt="cb-Rupee"/> &nbsp;
              </div>
              <div>
                {provider === 'Swayam'
                  ? 'Free'
                  : Gstate.price === '' ||
                  Gstate.price === null
                    ? 'Provider subscription required'
                    : Gstate.price === 0
                      ? 'Free'
                      : formatPrice(Gstate.price).toLocaleString(
                        'en-IN',
                      )}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => {
                  trackEvent(
                    'Enroll Now',
                    'click',
                    `${provider}|${Gstate.title}`,
                  );
                  window.open(
                    provider === 'Swayam'
                      ? Gstate.url &&
                      Gstate.url.replace(
                        'www.swayam.com',
                        'www.swayam.gov.in',
                      )
                      : Gstate.url && Gstate.url,
                    '_blank',
                  );
                }}
                className="enroll-btn"
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: '600',
                    }}
                  >
                    <div>Enroll Now &nbsp;</div>
                  </div>
                  <div>
                    <ArrowForwardIcon
                      style={{ fontSize: '22px', marginTop: '2px' }}
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );


  const courseraSummary = (type, count) => (
    <>
      <div
        style={{
          background: '#fff',
          padding: '20px',
          paddingLeft: '40px',
        }}
        className="cd-card"
      >
        <Typography
          style={{ fontWeight: '600', fontSize: '22px' }}
          variant="subtitle2"
          color="primary"
          gutterBottom
        >
          <div style={{ color: '#444444', borderBottom: '2px solid #f15a29', padding: '5px', display: 'inline' }}>
            At a Glance
          </div>
        </Typography>
        <div className="d-flex" style={{ flexDirection: 'column', marginTop: '25px',  lineHeight: '35px' }}>
          <div style={{ display: 'flex' }}>
            <div>
              <QueryBuilderIcon color="secondary"/> &nbsp;
            </div>
            <div>{Gstate.summaryData.commitment}</div>
            {/* <div>
              {
                Gstate.data.additionalDetails.durationText.split(
                  'weekSuggested'
                )[1]
              }
            </div> */}
          </div>

          {type === 'degree' ? (
            <div style={{ display: 'flex', marginTop: '15px',  lineHeight: '35px' }}>
              <div>
                <MoveToInboxIcon color="secondary"/> &nbsp;
              </div>
              <div>{` Starts on ${formatDate(
                new Date(Gstate.summaryData.start_date),
                'MMMM d',
              )}`}</div>
              {/* <div>{Gstate.data.additionalDetails.courses.length} courses</div> */}
            </div>
          ) : (
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <div>
                <DateRangeIcon color="secondary"/> &nbsp;
              </div>
              <div>{` Starts on ${formatDate(
                new Date(Gstate.summaryData.start_date),
                'MMMM d',
              )}`}</div>
              <div></div>
            </div>
          )}

          <div style={{ display: 'flex', marginTop: '15px',  lineHeight: '35px' }}>
            <div>
              {/* <img src={Rupee} alt="cb-Rupee" /> &nbsp; */}
              <img src={Rupee} alt="cb-Rupee"/> &nbsp;
              &nbsp;
            </div>
            <div>
              {provider === 'Swayam'
                ? 'Free'
                : Gstate.summaryData.price === '' ||
                Gstate.summaryData.price === null
                  ? 'Provider subscription required'
                  : Gstate.summaryData.price === 0
                    ? 'Free'
                    : formatPrice(Gstate.summaryData.price).toLocaleString('en-IN')}
              {/* {Gstate.data.rakutenDetails.price.retail._text} */}
            </div>
          </div>

          <div class="pr-pad" style={{ display: 'flex', marginTop: '15px',  lineHeight: '35px' }}>
            <div>
              <ListAltIcon color="secondary"/> &nbsp;
            </div>
            {/* <div>{Gstate.summaryData.provider}</div> */}
            <div>Coursera</div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => {
                trackEvent(
                  'Enroll Now',
                  'click',
                  `${provider}|${Gstate.data.title}`,
                );
                window.open(Gstate.data.rakutenDetails.URL.product._text);
              }}
              className="enroll-btn"
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '600',
                  }}
                >
                  <div>Enroll Now &nbsp;</div>
                </div>
                <div>
                  <ArrowForwardIcon
                    style={{ fontSize: '22px', marginTop: '2px' }}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // this section in not need 
  // const reviews = () => (
  //   <>
  //     {Gstate.rlaoding ? (
  //       <p>Loading</p>
  //     ) : Gstate.reviews.length > 0 ? (
  //       Gstate.reviews.map(data => (
  //         <Grid
  //           key={data.course_id}
  //           container
  //           style={{
  //             padding: 20,
  //             background: '#00000015',
  //             marginTop: '15px',
  //           }}
  //         >
  //           <Grid item xs={3}>
  //             <Grid item xs={12}>
  //               <Box style={{ padding: '0 10px' }}>
  //                 <img
  //                   className="review-image"
  //                   src="https://www.sketchengine.eu/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
  //                   alt="user"
  //                 />
  //               </Box>
  //             </Grid>
  //           </Grid>
  //           <Grid item xs={9}>
  //             <Typography color="primary" variant="h6">
  //               {data.username}
  //             </Typography>
  //             <Box
  //               style={{
  //                 padding: 30,
  //                 paddingTop: 5,
  //                 paddingLeft: 5,
  //               }}
  //             >
  //               {data.review}
  //             </Box>
  //           </Grid>
  //         </Grid>
  //       ))
  //     ) : (
  //       <p>No reviews for this course</p>
  //     )}
  //   </>
  // );

  // const coursera = () => {
  //   return (
  //     Gstate.data && Gstate.data.additionalDetails &&
  //     (Gstate.data.additionalDetails.courses.length === 0 ? (
  //       <div maxwidth="lg" className="ead-sec">
  //         <div className="cd-container">
  //           <Grid container spacing={3} direction="row-reverse">
  //             <Grid item xs={12} sm={4}>
  //               {courseraSummary('course', 0)}
  //             </Grid>
  //             <Grid item xs={12} sm={8}>
  //               <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
  //                 <div className="cd-head">
  //                   <div className="cd-head-o">
  //                     <Typography
  //                       style={{ fontWeight: '600' }}
  //                       color="primary"
  //                       variant="subtitle2"
  //                       gutterBottom
  //                     >
  //                       <span style={{ color: '#444444' }}>
  //                         {
  //                           Gstate.data.rakutenDetails._attributes
  //                             .manufacturer_name
  //                         }
  //                       </span>
  //                     </Typography>
  //                     <Typography variant="h5" style={{ fontWeight: 600 }} gutterBottom>
  //                       {Gstate.data.additionalDetails.title}
  //                     </Typography>
  //                     <Typography
  //                       variant="caption"
  //                       display="block"
  //                       className="provider"
  //                       style={{
  //                         borderRadius: '10px',
  //                         padding: '2px 10px 3px 10px',
  //                         color: 'white',
  //                         background: '#f15a29',
  //                         display: 'inline',
  //                       }}
  //                       gutterBottom
  //                     >
  //                       via Coursera
  //                     </Typography>
  //                   </div>

  //                   <div style={{ textAlign: 'right' }} className="cd-head-t">
  //                     {/* {reviewSection(
  //                  Gstate.data.avg_rating,
  //                  Gstate.data.num_reviews
  //                )} */}
  //                   </div>
  //                 </div>
  //                 <br/>
  //                 <div className="cd-cont">
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Course Level:&nbsp;
  //                     <span className="r-fw">
  //                       {' '}
  //                       {
  //                         Gstate.data.additionalDetails.levelOfCourse.split(
  //                           ' ',
  //                         )[0]
  //                       }
  //                     </span>
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Course Overview
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontSize: '16px', fontWeight: '300' }}
  //                     variant="body1"
  //                     gutterBottom
  //                   >
  //                     {/* {ReactHtmlParser(Gstate.data.full_description, {
  //                  transform: node => {
  //                    if (node.name === 'h2' || node.name === 'h3') {
  //                      // console.log({ node });
  //                      return <Box>{node.children[0].children[0].data}</Box>;
  //                    }
  //                    if (node.name === 'br') {
  //                      return null;
  //                    }
  //                    if (node.name === 'strong') {
  //                      console.log({ node });
  //                      return <Box>{node.children[0].data}</Box>;
  //                    }
  //                  },
  //                })} */}
  //                     {Gstate.data.rakutenDetails.description.long._text}
  //                   </Typography>
  //                   <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Syllabus
  //                   </Typography>
  //                   {Gstate.data.additionalDetails.syllabus.map(
  //                     (item, index) => {
  //                       return (
  //                         <>
  //                           <Typography
  //                             key={index}
  //                             style={{ fontSize: '16px', fontWeight: '300' }}
  //                             variant="body1"
  //                             gutterBottom
  //                           >
  //                             <p>
  //                               {item.title} &nbsp; (
  //                               {
  //                                 Gstate.data.additionalDetails.hoursToComplete[
  //                                   index
  //                                   ].text.split(' to')[0]
  //                               }
  //                               )
  //                             </p>
  //                             <p className="mt-n mt-1">{item.content}</p>
  //                           </Typography>
  //                         </>
  //                       );
  //                     },
  //                   )}
  //                   <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Students Enrolled:&nbsp;{' '}
  //                     {/* {this.Gstate.closestRun.staff.map((obj, index) => (
  //                      <span key={index} style={{ fontWeight: '300' }}>
  //                        {obj.given_name}
  //                      </span>
  //                    ))} */}
  //                     <span className="r-fw">
  //                       {Gstate.data.additionalDetails.instructorsLearnerCount.toLocaleString()}
  //                     </span>
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Professor:&nbsp;{' '}
  //                     {/* {this.Gstate.closestRun.staff.map((obj, index) => (
  //                      <span key={index} style={{ fontWeight: '300' }}>
  //                        {obj.given_name}
  //                      </span>
  //                    ))} */}
  //                     <span className="r-fw">
  //                       {Gstate.data.additionalDetails.instructorName}
  //                     </span>
  //                   </Typography>

  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Reviews
  //                   </Typography>
  //                   <div>
  //                     <button
  //                       onClick={() => {
  //                         setState({ ...Gstate, popUp: !Gstate.popUp });
  //                       }}
  //                       className="enroll-btn"
  //                     >
  //                       <div style={{ display: 'flex', flexDirection: 'row' }}>
  //                         <div
  //                           style={{
  //                             display: 'flex',
  //                             alignItems: 'center',
  //                             fontWeight: '600',
  //                           }}
  //                         >
  //                           <div>Write Review &nbsp;</div>
  //                         </div>
  //                         <div>
  //                           <RateReviewIcon
  //                             style={{ fontSize: '22px', marginTop: '2px' }}
  //                           />
  //                         </div>
  //                       </div>
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </Grid>
  //           </Grid>
  //         </div>
  //       </div>
  //     ) : (
  //       <div maxwidth="lg" className="ead-sec">
  //         <div className="cd-container">
  //           <Grid container spacing={3} direction="row-reverse">
  //             <Grid item xs={12} sm={3}>
  //               {courseraSummary('degree', 0)}
  //             </Grid>
  //             <Grid item xs={12} sm={9}>
  //               <div className="orange-band1">
  //                 <div> This course is professional certificate</div>
  //                 <div className="iconSchool">
  //                   <SchoolIcon/>
  //                 </div>
  //               </div>
  //               <div className="d-card">
  //                 <div className="cd-head">
  //                   <div className="cd-head-o">
  //                     <Typography
  //                       style={{ fontWeight: '600' }}
  //                       color="primary"
  //                       variant="subtitle2"
  //                       gutterBottom
  //                     >
  //                       {
  //                         CourseraDegree.rakutenDetails._attributes
  //                           .manufacturer_name
  //                       }
  //                     </Typography>
  //                     <Typography variant="h6" gutterBottom>
  //                       {CourseraDegree.additionalDetails.title}
  //                     </Typography>
  //                     <Typography
  //                       variant="caption"
  //                       display="block"
  //                       className="provider"
  //                       gutterBottom
  //                     >
  //                       via Coursera
  //                     </Typography>
  //                   </div>

  //                   <div style={{ textAlign: 'right' }} className="cd-head-t">
  //                     {/* {reviewSection(
  //                     Gstate.data.avg_rating,
  //                     Gstate.data.num_reviews
  //                   )} */}
  //                   </div>
  //                 </div>
  //                 <br/>
  //                 <div className="cd-cont">
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Course Level:&nbsp;
  //                     <span className="r-fw">
  //                       {
  //                         CourseraDegree.additionalDetails.levelOfCourse.split(
  //                           ' ',
  //                         )[0]
  //                       }
  //                     </span>
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     About the Course
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontSize: '16px', fontWeight: '300' }}
  //                     variant="body1"
  //                     gutterBottom
  //                   >
  //                     {/* {ReactHtmlParser(Gstate.data.full_description, {
  //                     transform: node => {
  //                       if (node.name === 'h2' || node.name === 'h3') {
  //                         // console.log({ node });
  //                         return <Box>{node.children[0].children[0].data}</Box>;
  //                       }
  //                       if (node.name === 'br') {
  //                         return null;
  //                       }
  //                       if (node.name === 'strong') {
  //                         console.log({ node });
  //                         return <Box>{node.children[0].data}</Box>;
  //                       }
  //                     },
  //                   })} */}
  //                     {CourseraDegree.rakutenDetails.description.long._text}
  //                   </Typography>
  //                   <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     What is a Professional Certificate?
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '16px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Build the job to get job ready
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontSize: '16px', fontWeight: '300' }}
  //                     variant="body1"
  //                     gutterBottom
  //                   >
  //                     Whether you're looking to start a new career. or change
  //                     your current one, Professional Certificates on Coursera
  //                     help you become job ready. Learn at your own pace,
  //                     whenever and whereever it's most convenient for you.
  //                     Enroll today and explore a new career path with a 7 day
  //                     free trial. You can pause your learning and your
  //                     subscription at any time.
  //                   </Typography>
  //                   <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '16px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Hands-On Projects
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontSize: '16px', fontWeight: '300' }}
  //                     variant="body1"
  //                     gutterBottom
  //                   >
  //                     Apply your skills with hands-on projects and build a
  //                     portfolio that showcases your job readiness to potential
  //                     employers. You'll need to successfully finish the
  //                     project(s) to earn your Certificate.
  //                   </Typography>
  //                   <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '16px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Earn a Career Credential
  //                   </Typography>
  //                   <Typography
  //                     style={{ fontSize: '16px', fontWeight: '300' }}
  //                     variant="body1"
  //                     gutterBottom
  //                   >
  //                     When you complete all of the courses in the program,
  //                     you'll earn a Certificate to share with oyur professional
  //                     network as well as unlock access to career support
  //                     resources to help you kickstart your new career. Many
  //                     Professional Certificates have hiring partners that
  //                     recignize the Professional Certificate credfential and
  //                     others can help prepare you for a certification exam. You
  //                     can find more information on individual Professional
  //                     Certificate pages where it applies.
  //                   </Typography>
  //                   <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '17px' }}
  //                     variant="subtitle2"
  //                     color="primary"
  //                     gutterBottom
  //                   >
  //                     4 Courses in the MasterTrack<sup>TM</sup> Certificate
  //                   </Typography>
  //                   <div className="courses-list">
  //                     {CourseraDegree.additionalDetails.courses.map(
  //                       (item, index) => {
  //                         return (
  //                           <div className="course-item">
  //                             <div className="c-left-item">
  //                               <div>
  //                                 <Typography
  //                                   style={{
  //                                     fontWeight: '600',
  //                                     fontSize: '17px',
  //                                   }}
  //                                   variant="subtitle2"
  //                                   color="primary"
  //                                   gutterBottom
  //                                 >
  //                                   Course
  //                                 </Typography>
  //                               </div>
  //                               <div className="mt-n2">
  //                                 <Typography
  //                                   style={{
  //                                     fontWeight: '600',
  //                                     fontSize: '65px',
  //                                   }}
  //                                   variant="subtitle2"
  //                                   color="primary"
  //                                   gutterBottom
  //                                 >
  //                                   {index + 1}
  //                                 </Typography>
  //                               </div>
  //                             </div>
  //                             <div className="c-right-item">
  //                               <div>
  //                                 <Typography
  //                                   style={{
  //                                     fontWeight: '600',
  //                                     fontSize: '16px',
  //                                   }}
  //                                   variant="subtitle2"
  //                                   gutterBottom
  //                                 >
  //                                   {item.name}
  //                                 </Typography>
  //                                 <p>{item.details}</p>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         );
  //                       },
  //                     )}
  //                   </div>
  //                   <br/>
  //                   <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Offered By:&nbsp;{' '}
  //                     <span className="r-fw">
  //                       {' '}
  //                       {CourseraDegree.additionalDetails.instructorName}
  //                     </span>
  //                   </Typography>
  //                   <br/> <br/>
  //                   <Typography
  //                     style={{ fontWeight: '600', fontSize: '22px' }}
  //                     variant="subtitle2"
  //                     gutterBottom
  //                   >
  //                     Reviews
  //                   </Typography>
  //                   <div>
  //                     <button
  //                       onClick={() => {
  //                         setState({ ...Gstate, popUp: !Gstate.popUp });
  //                       }}
  //                       className="enroll-btn"
  //                     >
  //                       <div style={{ display: 'flex', flexDirection: 'row' }}>
  //                         <div
  //                           style={{
  //                             display: 'flex',
  //                             alignItems: 'center',
  //                             fontWeight: '600',
  //                           }}
  //                         >
  //                           <div>Write Review &nbsp;</div>
  //                         </div>
  //                         <div>
  //                           <RateReviewIcon
  //                             style={{ fontSize: '22px', marginTop: '2px' }}
  //                           />
  //                         </div>
  //                       </div>
  //                     </button>
  //                   </div>
  //                {/* {reviews()} */}
  //                 </div>
  //               </div>
  //             </Grid>
  //           </Grid>
  //         </div>
  //       </div>
  //     ))
  //   );
  // };


  const coursera = () => {
    return (
        Gstate && (
          <div maxwidth="lg" className="ead-sec">
            <div className="cd-container">
              <Grid container spacing={3} direction="row-reverse">
                <Grid item xs={12} sm={3}>
                  {courseSummary()}
                </Grid>
                <Grid item xs={12} sm={9}>
                  <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                    <div className="cd-head">
                      <div className="cd-head-o">
                        <Typography
                          style={{ fontWeight: '600' }}
                          color="primary"
                          variant="subtitle2"
                          className="u-uni"
                          gutterBottom
                        >
                          {Gstate.provider}
                        </Typography>
                        <Typography variant="h6" className="u-title" gutterBottom>
                          {Gstate.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          className="provider u-provider"
                          gutterBottom
                        >
                          via {provider}
                        </Typography>
                      </div>
                    </div>
                    <br/>
                    <div className="cd-cont">
                      <Typography align = "justify"
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Course Overview
                      </Typography>
                      <Typography align = "justify"
                        style={{ fontSize: '16px', fontWeight: '300' }}
                        variant="body1"
                        gutterBottom
                      >
                        {ReactHtmlParser(Gstate.description)}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        )
      );
  };


  const edX = () =>{
  // count++;
  return(
  Gstate && (
    <div maxwidth="lg" className="ead-sec">
      <div className="cd-container">
        <Grid container spacing={3} direction="row-reverse">
          <Grid item xs={12} sm={3}>
            {courseSummary()}
          </Grid>
          <Grid item xs={12} sm={9}>
            <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
              <div className="cd-head">
                <div className="cd-head-o">
                  <Typography
                    style={{ fontWeight: '600' }}
                    color="primary"
                    variant="subtitle2"
                    className="u-uni"
                    gutterBottom
                  >
                    {Gstate.provider}
                  </Typography>
                  <Typography variant="h6" className="u-title" gutterBottom>
                    {Gstate.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className="provider u-provider"
                    gutterBottom
                  >
                    via {provider}
                  </Typography>
                </div>
              </div>
              <br/>
              <div className="cd-cont">
                <Typography align = "justify"
                  style={{ fontWeight: '600', fontSize: '22px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Course Overview
                </Typography>
                <Typography align = "justify"
                  style={{ fontSize: '16px', fontWeight: '300' }}
                  variant="body1"
                  gutterBottom
                >
                  {ReactHtmlParser(Gstate.description)}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
);
}

  const udemy = () => {
    return (
      Gstate && (
        <div maxwidth="lg" className="ead-sec">
          <div className="cd-container">
            <Grid container spacing={3} direction="row-reverse">
              <Grid item xs={12} sm={3}>
                {courseSummary()}
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                  <div className="cd-head">
                    <div className="cd-head-o">
                      <Typography
                        style={{ fontWeight: '600' }}
                        color="primary"
                        variant="subtitle2"
                        className="u-uni"
                        gutterBottom
                      >
                        {Gstate.provider}
                      </Typography>
                      <Typography variant="h6" className="u-title" gutterBottom>
                        {Gstate.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        className="provider u-provider"
                        gutterBottom
                      >
                        via {provider}
                      </Typography>
                    </div>
                  </div>
                  <br/>
                  <div className="cd-cont">
                    <Typography align = "justify"
                      style={{ fontWeight: '600', fontSize: '22px' }}
                      variant="subtitle2"
                      gutterBottom
                    >
                      Course Overview
                    </Typography>
                    <Typography align = "justify"
                      style={{ fontSize: '16px', fontWeight: '300' }}
                      variant="body1"
                      gutterBottom
                    >
                      {ReactHtmlParser(Gstate.description)}
                    </Typography>
                   
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )
    );
  };

 

  const fl = () =>{
    return (
      Gstate && (
        <div maxwidth="lg" className="ead-sec">
          <div className="cd-container">
            <Grid container spacing={3} direction="row-reverse">
              <Grid item xs={12} sm={3}>
                {courseSummary()}
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                  <div className="cd-head">
                    <div className="cd-head-o">
                      <Typography
                        style={{ fontWeight: '600' }}
                        color="primary"
                        variant="subtitle2"
                        className="u-uni"
                        gutterBottom
                      >
                        {Gstate.provider}
                      </Typography>
                      <Typography variant="h6" className="u-title" gutterBottom>
                        {Gstate.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        className="provider u-provider"
                        gutterBottom
                      >
                        via {provider}
                      </Typography>
                    </div>
                  </div>
                  <br/>
                  <div className="cd-cont">
                    <Typography align = "justify"
                      style={{ fontWeight: '600', fontSize: '22px' }}
                      variant="subtitle2"
                      gutterBottom
                    >
                      Course Overview
                    </Typography>
                    <Typography align = "justify"
                      style={{ fontSize: '16px', fontWeight: '300' }}
                      variant="body1"
                      gutterBottom
                    >
                      {ReactHtmlParser(Gstate.description)}
                    </Typography>
                   
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )
    );
  };


  const sl = () =>
    Gstate.data && (
      <div maxwidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.summaryData.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(Gstate.data.courseData.fields.title)}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      className="provider"
                      gutterBottom
                    >
                      via {provider}
                    </Typography>
                  </div>
                  {/* <div style={{ textAlign: 'right' }}>
                    {reviewSection(
                      parseFloat(Gstate.data.courseData.fields.star_ratings),
                      -1,
                    )}
                  </div> */}
                </div>
                <br/>
                <div className="cd-cont">
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Overview
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.courseData.highlights.content)}
                  </Typography>

                  {Gstate.data.closestRun !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        {this.Gstate.closestRun.staff.map((obj, index) => (
                          <span key={index} style={{ fontWeight: '300' }}>
                            {obj.given_name}
                          </span>
                        ))}
                      </Typography>
                    </>
                  )}
                  <br/>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Reviews
                  </Typography>
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...Gstate, popUp: !Gstate.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  {/* {reviews()} */}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const swayam = () =>
    Gstate.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.summaryData.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(Gstate.data.title)}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      className="provider"
                      gutterBottom
                    >
                      via {provider}
                    </Typography>
                  </div>
                  {/* <div style={{ textAlign: 'right' }}>{reviewSection()}</div> */}
                </div>
                <br/>
                <div className="cd-cont">
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Overview
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.sections[0], {
                      transform: node => {
                        if (node.name === 'b') {
                          return (
                            <Typography
                              style={{ fontWeight: '600', fontSize: '22px' }}
                              variant="subtitle2"
                              gutterBottom
                            >
                              {node.children[0].data}{' '}
                            </Typography>
                          );
                        }
                      },
                    })}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Layout
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.sections[2], {
                      transform: node => {
                        if (node.name === 'h3') {
                          return null;
                        }
                      },
                    })}
                  </Typography>

                  {/* <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Certificate
                  </Typography> */}
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.sections[5], {
                      transform: (node, index, transform) => {
                        if (node.children && node.children[8]) {
                          node.children = node.children.slice(0, 8);
                          return convertNodeToElement(node, index, transform);
                        }
                      },
                    })}
                  </Typography>

                  {Gstate.data.closestRun !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        {this.Gstate.closestRun.staff.map((obj, index) => (
                          <span key={index} style={{ fontWeight: '300' }}>
                            {obj.given_name}
                          </span>
                        ))}
                      </Typography>
                    </>
                  )}
                  <br/>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Reviews
                  </Typography>
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...Gstate, popUp: !Gstate.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  {/* {reviews()} */}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const upGrad = () =>
    Gstate.data && (
      <div maxWidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.data.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {Gstate.data.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      className="provider"
                      gutterBottom
                    >
                      via {provider}
                    </Typography>
                  </div>
                  {/* <div style={{ textAlign: 'right' }}>
                    {reviewSection(
                      undefined,
                      parseInt(Gstate.data.no_of_reviews),
                    )} */}
                  </div>
                </div>
                <br/>
                <div className="cd-cont">
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Overview
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {Gstate.data.short_description}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Whos is this course for?
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {Gstate.data.who_is_this_program_for}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    What will you learn?
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {Gstate.data.top_Skills}
                  </Typography>

                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Minimum Eligibility
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {Gstate.data['Minimum Eligibility']}
                  </Typography>

                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Job Opportunities
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {Gstate.data['job_opportunities\n']}
                  </Typography>

                  {/* <Typography
                  style={{ fontWeight: '600', fontSize: '18px' }}
                  variant="subtitle2"
                  gutterBottom
                >
                  Professor:{' '}
                  {this.Gstate.closestRun.staff.map((obj, index) => (
                    <span key={index} style={{ fontWeight: '300' }}>
                      {obj.given_name}
                    </span>
                  ))}
                </Typography> */}
                  <br/>
                  {/* <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Reviews
                  </Typography> */}
                  {/* <div>
                    <button
                      onClick={() => {
                        setState({ ...Gstate, popUp: !Gstate.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '18px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div> */}
                  {/* {reviews()} */}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const udacity = () =>
    Gstate.data && (
      <div
        maxWidth="lg"
        style={{ marginTop: '40px', background: '#FAFAFA' }}
        className="ead-sec"
      >
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9} className="bgwhite">
              <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                <div className="cd-head">
                  <div>
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.summaryData.university}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {ReactHtmlParser(Gstate.data.title)}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      className="provider"
                      gutterBottom
                    >
                      via {provider}
                    </Typography>
                  </div>
                  {/* <div style={{ textAlign: 'right' }}>{reviewSection()}</div> */}
                </div>
                <br/>
                <div className="cd-cont">
                  <Typography
                    style={{ fontWeight: '600', fontSize: '18px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Overview
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.summary)}
                  </Typography>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Syllabus
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.syllabus, {
                      transform: node => {
                        if (node.name === 'h1') {
                          return (
                            <Typography
                              style={{ fontWeight: '600', fontSize: '18px' }}
                              variant="subtitle2"
                              gutterBottom
                            >
                              {node.children[0].data}
                            </Typography>
                          );
                        }
                      },
                    })}
                  </Typography>
                  {Gstate.data.instructors !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '18px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor(s):{' '}
                        {Gstate.data.instructors.map((obj, index) => (
                          <span key={index} style={{ fontWeight: '300' }}>
                            {obj.name + ', '}
                          </span>
                        ))}
                      </Typography>
                    </>
                  )}
                  <br/>
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Reviews
                  </Typography>
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...Gstate, popUp: !Gstate.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <br/>
                  {/* {reviews()} */}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  
    const digitalHealth = () =>
    Gstate.data && (
      <div maxwidth="lg" className="ead-sec">
        <div className="cd-container">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={3}>
              {courseSummary()}
            </Grid>
            <Grid item xs={12} sm={9}>
              <div className="d-card" style={{ backgroundColor: '#fff3ef', boxShadow: 'none' }}>
                <div className="cd-head">
                  <div className="cd-head-o">
                    <Typography
                      style={{ fontWeight: '600' }}
                      color="primary"
                      variant="subtitle2"
                      gutterBottom
                    >
                      {Gstate.data && Gstate.data.owners[0].name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {Gstate.data.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      className="provider"
                      gutterBottom
                    >
                      via {provider}
                    </Typography>
                  </div>
                  {/* <div style={{ textAlign: 'right' }} className="cd-head-t">
                    {reviewSection(
                      Gstate.data.avg_rating,
                      Gstate.data.num_reviews,
                    )}
                  </div> */}
                </div>
                <br/>
                <div className="cd-cont">
                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Course Overview1111111
                  </Typography>
                  <Typography
                    style={{ fontSize: '16px', fontWeight: '300' }}
                    variant="body1"
                    gutterBottom
                  >
                    {ReactHtmlParser(Gstate.data.full_description, {
                      transform: node => {
                        if (node.name === 'h2' || node.name === 'h3') {
                          // console.log({ node });
                          return <Box>{node.children[0].children[0].data}</Box>;
                        }
                        if (node.name === 'br') {
                          return null;
                        }
                        if (node.name === 'strong') {
                          console.log({ node });
                          return <Box>{node.children[0].data}</Box>;
                        }
                      },
                    })}
                  </Typography>
                  <br/>
                  {Gstate.data.outcome !== '' && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        What will you learn?
                      </Typography>
                      <Typography
                        style={{ fontSize: '16px', fontWeight: '300' }}
                        variant="body1"
                        gutterBottom
                      >
                        {ReactHtmlParser(Gstate.data.outcome, {
                          transform: node => {
                            // console.log({ node });
                            if (node.name === 'h2') {
                              return <Box>{node.children[0].data}</Box>;
                            }
                          },
                        })}
                      </Typography>{' '}
                    </>
                  )}
                  {Gstate.data.prerequisites_raw !== '' ? (
                    <>
                      {' '}
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Prerequisites
                      </Typography>
                      <Typography
                        style={{ fontSize: '16px', fontWeight: '300' }}
                        variant="body1"
                        gutterBottom
                      >
                        {ReactHtmlParser(Gstate.data.prerequisites_raw)}
                      </Typography>
                    </>
                  ) : null}
                  <br/>

                  {Gstate.data.closestRun !== undefined && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        {this.Gstate.closestRun.staff.map((obj, index) => (
                          <span key={index} style={{ fontWeight: '300' }}>
                            {obj.given_name}
                          </span>
                        ))}
                      </Typography>
                    </>
                  )}

                  <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Reviews
                  </Typography>
                  <div>
                    <button
                      onClick={() => {
                        setState({ ...Gstate, popUp: !Gstate.popUp });
                      }}
                      className="enroll-btn"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                          }}
                        >
                          <div>Write Review &nbsp;</div>
                        </div>
                        <div>
                          <RateReviewIcon
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  {/* {reviews()} */}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  const renderSwitch = provider => {
    console.log(provider);
    console.log('=============');
    switch (provider) {
      case 'edX':
        count+=1;
        return edX();
      case 'Udemy':
        return udemy();
      case 'FutureLearn':
        return fl();
      case 'SimpliLearn':
        return sl();
      case 'upGrad':
        return upGrad();
      case 'Udacity':
        return udacity();
      case 'Swayam':
        return swayam();
      case 'Coursera':
        return coursera();
      case 'DigitalHealth':
        return digitalHealth();
      default:
        return <h1>Coming Soon</h1>;
    }
  };

  const addReviewToCurrentState = data => {
    console.log('HIT HERE', data);
    setState({
      ...Gstate,
      reviews: [data, ...Gstate.reviews],
    });
  };

  const searchChange = e => {
    setState({
      ...Gstate,
      q: e.target.value,
    });
  };
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      trackEvent('search', 'onSearch', 'Search_homepage');
      ReactGA.ga('send', 'pageview', `/homepage?q=${Gstate.q}`);
      props.history.push({
        pathname: '/listing',
        state: {
          query: Gstate.q,
        },
      });
      e.preventDefault();
    }
  };

  return (
    <>
      <AppBar
        home={true}
        noHome={true}
        isSearchIncluded={true}
        onChange={searchChange}
        onKeyPress={onKeyPress}
      />
      <MobileTopbar onlySearch={true}/>
      <HomeModal
        openState={Gstate.popUp}
        uuid={uuid}
        provider={provider}
        // handlePopupClose={handlePopupClose}
        course={Gstate.data && Gstate.data.title}
        Mstate={1}
        addReviewToCurrentState={addReviewToCurrentState}
      />
      {Gstate.loading ? (
        <Grid
          align="center"
          style={{
            margin: '20px 0',
            width: '100%',
            height: '70vh',
            marginTop: '100px',
          }}
        >
          <CircularProgress color="primary"/>
        </Grid>
      ) : (
        renderSwitch(provider)
      )}

{/* {console.log("Yashwant Sahu printed this Gsatae =>".Gstate)} */}
      <Footer bgColor="white" />
    </>
  );
};

export default CourseDetails;
