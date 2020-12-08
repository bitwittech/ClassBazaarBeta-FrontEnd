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
import { Link } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Logo from '../assets/logo.png';
import MobileTopbar from './MobileTopbar';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Rupee from '../assets/rupee.svg';
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

const courseSummary = () =>

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
                At a Glance
      </Typography>
            <div className="d-flex">
                <div style={{ display: 'flex' }}>
                    <div>
                        <QueryBuilderIcon color="primary" /> &nbsp;
          </div>
                    <div>4 weeks</div>
                </div>

                <div style={{ display: 'flex', marginTop: '15px' }}>
                    <div>
                        <DateRangeIcon color="primary" /> &nbsp;
          </div>
                    <div>{` Starts on April 20,2020`}</div>
                </div>

                <div style={{ display: 'flex', marginTop: '15px' }}>
                    <div>
                        <img src={Rupee} alt="cb-rupee" /> &nbsp;
          </div>
                    <div>
                        3,50,000
                        </div>
                </div>

                <div class="pr-pad" style={{ display: 'flex', marginTop: '15px' }}>
                    <div>
                        <ListAltIcon color="primary" /> &nbsp;
          </div>
                    <div>altMBA</div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => {
                            trackEvent(
                                'Enroll Now',
                                'click',
                                `${'altMBA'}|${'altMBA w/Seth Godin'}`
                            );
                            window.open(
                                'https://altmba.com/',
                                '_blank'
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


const AltMBA = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <AppBar noHome={true} />
            <div maxwidth="lg" className="ead-sec">
                <div className="cd-container">
                    <Grid container spacing={3} direction="row-reverse">
                        <Grid item xs={12} sm={3}>
                            {courseSummary()}
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <div className="d-card">
                                <div className="cd-head">
                                    <div className="cd-head-o">
                                        <Typography
                                            style={{ fontWeight: '600' }}
                                            color="primary"
                                            variant="subtitle2"
                                            className="u-uni"
                                            gutterBottom
                                        >
                                            Seth Godin
                                        </Typography>
                                        <Typography variant="h6" className="u-title" gutterBottom>
                                            altMBA w/Seth Godin
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            className="provider u-provider"
                                            gutterBottom
                                        >
                                            via altMBA
                                        </Typography>
                                    </div>
                                    <div style={{ textAlign: 'right' }} className="cd-head-t">

                                    </div>
                                </div>
                                <br />
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
                                        The altMBA is an intensive, 4-week online workshop designed by Seth Godin for high-performing individuals who want to level up and lead.
                                        In a nutshell, you will: <br />
                                        - Classmates from 45+ countries and 85 industries (and counting). <br />
                                        - Ship 13 projects in a month, and put knowledge into practice. <br />
                                        - Intimate learning experience with dedicated coaches. <br />
                                        - Team discussions 3x per week for feedback and collaboration.<br />
                                    </Typography>
                                    <br />

                                    <>
                                        <Typography
                                            style={{ fontWeight: '600', fontSize: '22px' }}
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            How is the altMBA Different?
                        </Typography>
                                        <Typography
                                            style={{ fontSize: '16px', fontWeight: '300' }}
                                            variant="body1"
                                            gutterBottom
                                        >
                                            Following a competitive selection process, the altMBA delivers a condensed learning experience through teamwork, personalized feedback, coaching, curated readings, and shipping 13 projects in 4 weeks to take fast-tracked leaders to the next level.<br /><br />
                                            <i><strong>COMBINING 25 YEARS OF INSIGHT</strong></i><br />
Seth Godin has created 13 hands-on projects designed to work in a connected, digital workshop. Highly leveraged, intensive, and applicable.<br /><br />
                                            <i><strong>COACHING</strong></i><br />
With one coach for every ten students, we’re able to pay attention to our students and the work they create.<br /><br />
                                            <i><strong>LEARN BY DOING</strong></i><br />
Our student portal features curated resources, videos, articles, and books. Of course, it’s not about secret content—the altMBA is a workshop, and your time is spent creating, critiquing and leveling up.<br />
                                        </Typography>{' '}
                                    </>


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
                                        <div className="flex-1">
                                            <div className="d-1">                                        - Decision-making <br />
- Operating under ambiguity<br />
- Understanding worldviews<br />
- Risk-taking<br />
- Critical thinking<br />
- Storytelling<br /></div>
                                            <div ckassName="d-2">

                                                - Marketing<br />
- Strategy<br />
- Driving innovation<br />
- Securing buy-in<br />
- Management<br />
- Making change happen<br />
                                            </div>
                                        </div>


                                    </Typography>


                                    <br />

                                    <Typography
                                        style={{ fontWeight: '600', fontSize: '22px' }}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        Is this course right for you?
                        </Typography>
                                    <Typography
                                        style={{ fontSize: '16px', fontWeight: '300' }}
                                        variant="body1"
                                        gutterBottom
                                    >
                                        Our curriculum is hands-on. More than 75% of your time is dedicated to shipping your work—practical projects that allow you to apply what you learn. Tuition is ₹3,11,500, and most large companies will reimburse you (ask your HR team).
                                        </Typography>

                                    <br />
                                    <Typography
                                        style={{ fontWeight: '600', fontSize: '22px' }}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        Professor: Seth Godin
                      </Typography>

                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>



        </div >
    )
}

export default AltMBA
