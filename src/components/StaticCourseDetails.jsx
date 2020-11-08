import { Container, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import AppBar from './AppBar';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Footer from './Footer';
import HomeModal from './HomeModal';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Logo from '../assets/logo.png';
import BlackLogo from '../assets/img/logo.png'
import MobileTopbar from './MobileTopbar';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RateReviewIcon from '@material-ui/icons/RateReview';
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
import { Link } from 'react-router-dom';
import MoveToInboxIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Rupee from '../assets/rupee.svg';
import DigitalHealth from '../assets/DignityHealth.png'

const StaticCourseDetails = props => {
  console.log(props)
  var data = props.location.state.data;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);
  
  const dignityCourseSummary = () => (
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


        <div className="d-flex" style={{ flexDirection: 'column', marginTop: '25px', lineHeight: '35px' }}>
          <div style={{ display: 'flex' }}>
            <div>
              <QueryBuilderIcon color="secondary"/> &nbsp;
            </div>
            <div>{data.duration}</div>
            {/* <div>
              {
                Gstate.data.additionalDetails.durationText.split(
                  'weekSuggested'
                )[1]
              }
            </div> */}
          </div>
          {data.startDate ? (
            data.type === 'degree' ? (
              <div style={{ display: 'flex', marginTop: '15px', lineHeight: '35px' }}>
                <div>
                  <MoveToInboxIcon color="secondary"/> &nbsp;
                </div>
                <div>{` Starts on  ${data.startDate}`}</div>
                {/* <div>{Gstate.data.additionalDetails.courses.length} courses</div> */}
              </div>
            ) : (
              <div style={{ display: 'flex', marginTop: '15px' }}>
                <div>
                  <DateRangeIcon color="secondary"/> &nbsp;
                </div>
                <div>{` Starts on  ${data.startDate}`}</div>
                <div></div>
              </div>
            )
  
          ):(
            null
          )}
          
          <div style={{ display: 'flex', marginTop: '15px', lineHeight: '35px' }}>
            <div>
              {/* <img src={Rupee} alt="cb-rupee" /> &nbsp; */}
              <img src={Rupee} alt="cb-rupee"/> &nbsp;
              &nbsp;
            </div>
            <div>
              {data.provider === 'Swayam'
                ? 'Free'
                : data.price === '' ||
                data.price === null
                  ? 'Provider subscription required'
                  : data.price === 0
                    ? 'Free'
                    : data.price}
              {/* {Gstate.data.rakutenDetails.price.retail._text} */}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => {
                trackEvent(
                  'Enroll Now',
                  'click',
                  `${data.provider}|${data.name}`,
                );
                window.open(
                  data.provider === 'Swayam'
                    ? data.enroll &&
                    data.enroll.replace(
                      'www.swayam.com',
                      'www.swayam.gov.in',
                    )
                    : data.enroll && data.enroll,
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
  
  const courseSummary = () => (
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


        <div className="d-flex" style={{ flexDirection: 'column', marginTop: '25px', lineHeight: '35px' }}>
          <div style={{ display: 'flex' }}>
            <div>
              <QueryBuilderIcon color="secondary"/> &nbsp;
            </div>
            <div>{data.duration}</div>
            {/* <div>
              {
                Gstate.data.additionalDetails.durationText.split(
                  'weekSuggested'
                )[1]
              }
            </div> */}
          </div>
          {data.startDate ? (
            data.type === 'degree' ? (
              <div style={{ display: 'flex', marginTop: '15px', lineHeight: '35px' }}>
                <div>
                  <MoveToInboxIcon color="secondary"/> &nbsp;
                </div>
                <div>{` Starts on  ${data.startDate}`}</div>
                {/* <div>{Gstate.data.additionalDetails.courses.length} courses</div> */}
              </div>
            ) : (
              <div style={{ display: 'flex', marginTop: '15px' }}>
                <div>
                  <DateRangeIcon color="secondary"/> &nbsp;
                </div>
                <div>{` Starts on  ${data.startDate}`}</div>
                <div></div>
              </div>
            )
  
          ):(
            null
          )}
          
          <div style={{ display: 'flex', marginTop: '15px', lineHeight: '35px' }}>
            <div>
              {/* <img src={Rupee} alt="cb-rupee" /> &nbsp; */}
              <img src={Rupee} alt="cb-rupee"/> &nbsp;
              &nbsp;
            </div>
            <div>
              {data.provider === 'Swayam'
                ? 'Free'
                : data.price === '' ||
                data.price === null
                  ? 'Provider subscription required'
                  : data.price === 0
                    ? 'Free'
                    : data.price}
              {/* {Gstate.data.rakutenDetails.price.retail._text} */}
            </div>
          </div>

          <div className="pr-pad" style={{ display: 'flex', marginTop: '15px', lineHeight: '35px' }}>
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
                  `${data.provider}|${data.name}`,
                );
                window.open(
                  data.provider === 'Swayam'
                    ? data.enroll &&
                    data.enroll.replace(
                      'www.swayam.com',
                      'www.swayam.gov.in',
                    )
                    : data.enroll && data.enroll,
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
  const edX = () => (
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
                    {data.university}
                  </Typography>
                  <Typography variant="h6" className="u-title" gutterBottom>
                    {data.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className="provider"
                    gutterBottom
                  >
                    via {data.provider}
                  </Typography>
                </div>
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
                  {ReactHtmlParser(data.outcome)}
                </Typography>
                <br/>

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
                  {ReactHtmlParser(data.prerequisites)}
                </Typography>

                <br/>

                {/* <Typography
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
                  </div> */}
                {/* {reviews()} */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
  const sl = () => (
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
                    {data.university}
                  </Typography>
                  <Typography variant="h6" className="u-title" gutterBottom>
                    {data.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className="provider"
                    gutterBottom
                  >
                    via {data.provider}
                  </Typography>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {/* {reviewSection(
                      parseFloat(Gstate.data.courseData.fields.star_ratings),
                      -1
                    )} */}
                </div>
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
                  {ReactHtmlParser(data.outcome)}
                </Typography>
                {/*
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
                  )} */}
                <br/>
                {/* <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
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
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div> */}
                {/* {reviews()} */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
  const udacity = () => (
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
                    {data.university}
                  </Typography>
                  <Typography variant="h6" className="u-title" gutterBottom>
                    {ReactHtmlParser(data.name)}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className="provider"
                    gutterBottom
                  >
                    via {data.provider}
                  </Typography>
                </div>
                {/* <div style={{ textAlign: 'right' }}> {reviewSection()} </div> */}
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
                  {ReactHtmlParser(data.outcome)}
                </Typography>
                {/* <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Syllabus
                  </Typography> */}
                {/* <Typography
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
                  </Typography> */}
                {/* {Gstate.data.instructors !== undefined && (
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
                  )} */}
                <br/>
                {/* <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
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
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div> */}
                <br/>
                {/* {reviews()} */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
  const fl = () => (
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
                    {data.university}
                  </Typography>
                  <Typography variant="h6" className="u-title" gutterBottom>
                    {data.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    className="provider"
                    gutterBottom
                  >
                    via {data.provider}
                  </Typography>
                </div>
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
                  {ReactHtmlParser(data.outcome)}
                </Typography>
                <br/>
                {/* {Gstate.data.learning_outcomes !== '' && (
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
                        {Gstate.data.learning_outcomes.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </Typography>{' '}
                    </>
                  )} */}
                {/* {Gstate.data.requirements !== '' && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Who is this course for?
                      </Typography>
                      <Typography
                        style={{ fontSize: '16px', fontWeight: '300' }}
                        variant="body1"
                        gutterBottom
                      >
                        {Gstate.data.requirements}
                      </Typography>{' '}
                    </>
                  )} */}

                <br/>

                {/* {Gstate.data.educator !== '' && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        <span style={{ fontWeight: '300' }}>
                          {Gstate.data.educator}
                        </span>
                      </Typography>
                    </>
                  )} */}
                <br/>
                {/* <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
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
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div> */}
                {/* {reviews()} */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const digitalHealth = () => (
    <div maxWidth="lg" className="ead-sec">
      <div className="cd-container">
        <Grid container spacing={3} direction="row-reverse">
          <Grid item xs={12} sm={3}>
            {dignityCourseSummary()}
            <div className="digi__Logo">
              <img src={DigitalHealth} alt=""Digital Health/>
            </div>            
          </Grid>
          <Grid item xs={12} sm={9}>
            <div style={{ backgroundColor: '#e6feff', boxShadow: 'none', marginLeft:'4rem' }}>
              <div className="cd__header" style={{ backgroundColor: '#b42f32'}}>
                <span>{data.provider} | Global Education</span>
              </div>
              <br/>
              <div className="cd__content">
                <div className="cd__content__inner">
                <div className="c__uniName">
                  <span>{data.university}</span>
                </div>
                <div className="c__cert"> 
                  {/* <span>Certificate in Healthcare</span><br/>
                  <span>Analytics for Decision-makers</span> */}
                  {ReactHtmlParser(data.name)}
                </div>
                <div className="c__lvl">
                  <span className="c__lvl_key">Course Level : </span>
                  <span className="c__lvl__val">Intermediate</span>
                </div>
                <div className="c__ovr">
                  <span className="c__ovr__title">Program Overview</span><br/>
                  <span className="c__ovr__des">{ReactHtmlParser(data.overView)}</span>
                </div>
                <div className="c__ovr">
                  {ReactHtmlParser(data.bulletPoints)}
                </div>
                <div className="c__cir">
                  <span className="c__ovr__title">Curriculum</span><br/>
                  <span className="c__ovr__des">{data.curriculum}</span>  
                  <br />
                  {ReactHtmlParser(data.curriculumDetails)}
                </div>
                <div className="c__cir">
                  <span className="c__ovr__title">Outcomes</span><br/>
                  <span className="c__ovr__des">{ReactHtmlParser(data.outcome)}</span>
                </div>

                <div className="c__cir">
                  <span className="c__ovr__title">Who should study this program?</span><br/>
                  <span className="c__ovr__des">{ReactHtmlParser(data.whyRequired)}</span>
                </div>

                <div className="c__cir">
                  <span className="c__ovr__title">{data.providerInfoName}</span><br/>
                  <span className="c__ovr__des">{ReactHtmlParser(data.providerInfo)}</span>
                </div>



                </div>
                {/* <Typography
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
                  {ReactHtmlParser(data.outcome)}
                </Typography> */}
                <br/>
                {/* {Gstate.data.learning_outcomes !== '' && (
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
                        {Gstate.data.learning_outcomes.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </Typography>{' '}
                    </>
                  )} */}
                {/* {Gstate.data.requirements !== '' && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Who is this course for?
                      </Typography>
                      <Typography
                        style={{ fontSize: '16px', fontWeight: '300' }}
                        variant="body1"
                        gutterBottom
                      >
                        {Gstate.data.requirements}
                      </Typography>{' '}
                    </>
                  )} */}

                <br/>

                {/* {Gstate.data.educator !== '' && (
                    <>
                      <Typography
                        style={{ fontWeight: '600', fontSize: '22px' }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Professor:{' '}
                        <span style={{ fontWeight: '300' }}>
                          {Gstate.data.educator}
                        </span>
                      </Typography>
                    </>
                  )} */}
                <br/>
                {/* <Typography
                    style={{ fontWeight: '600', fontSize: '22px' }}
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
                            style={{ fontSize: '22px', marginTop: '2px' }}
                          />
                        </div>
                      </div>
                    </button>
                  </div> */}
                {/* {reviews()} */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )



  const renderSwitch = provider => {
    switch (provider) {
      case 'edX':
        return edX();
      case 'SimpliLearn':
        return sl();
      case 'Udacity':
        return udacity();
      case 'FutureLearn':
        return fl();
      case 'DigitalHealth':
        return digitalHealth()
      default:
        return <h1>Coming Soon</h1>;
    }
  };
  return (
    <div>
      <AppBar/>
      <MobileTopbar onlySearch={true}/>
      {renderSwitch(data.provider)}
      <div className="footer" style={{ background: '#FAFAFA' }}>
        <div style={{ marginTop: '20px' }}>
          <img className="footer-logo" src={BlackLogo} alt="classbazarLogo"/>
        </div>
        <div className="footer-links">
          <div>
            <p>
              <Link
                onClick={() => {
                  trackEvent('About Us', 'click', 'footer');
                }}
                to="/about"
              >
                About Us
              </Link>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <Link to="/contact">Contact Us</Link>
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </p>
          </div>
        </div>
        <p className="footer-text"> Email: info@classbazaar.com </p>
        <p className="footer-text tsm">
          © Copyright 2019 <strong>Class Bazaar</strong>, All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default StaticCourseDetails;
