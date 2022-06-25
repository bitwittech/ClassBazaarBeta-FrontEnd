import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Pre_LOG_Box } from '../../store/Types';
import Store from '../../store/Context';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const FutureReadyCourse = withRouter(
  ({ history, degreeData, trackEvent, filter, routingURL }) => {
    const { state, dispatch } = useContext(Store);
    const { isAuth } = state;
    const data = degreeData;
    // Append by yashwant sahu

    const OpenLogin = () => {
      // sessionStorage.setItem('ShowBox',true);

      if (isAuth === false) {
        return dispatch({
          type: Pre_LOG_Box,
          payload: {
            state: 1,
            open: true,
          },
        });
      }
    };

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
      },
      tablet: {
        breakpoint: { max: 800, min: 600 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
      },
    };

    return (
      <Grid container className={'future-ready-courses'}>
        <Grid Item xs={12} md={5}>
          <div className="section-title">
            Future Ready Courses
            <div className="bottom-border" />
          </div>
          {/* <div className="section-sub-title">
            Launch yourself in your career with an online degree. Did you know
            many of the universities’ issue certificates which don’t even
            mention “taken online” on them.
          </div> */}
        </Grid>

        <Grid Item xs={12} md={7}>
          <Carousel
            className="card-section"
            dotListClass="custom-dot-list-style"
            keyBoardControl={true}
            autoPlaySpeed={1000}
            ssr={true}
            responsive={responsive}
          >
            {data.map((degree, key) => {
              return (
                <div
                  key={key}
                  className="card-wrapper"
                  onClick={() => {
                    if (isAuth !== true) {
                      OpenLogin();
                      trackEvent('Degree_course', 'click', `${degree.name}`);
                    } else {
                      history.push({
                        pathname: '/coursedetails' + degree.url,
                      });
                    }
                  }}
                >
                  <div className="card-inner">
                    <div className="head-section">via {degree.provider}</div>
                    <img src={degree.image} alt={key} />
                  </div>
                  <div className="university-section">{degree.university}</div>
                  <div className="name-section">{degree.name}</div>
                </div>
              );
            })}
          </Carousel>
        </Grid>

        <Grid Item xs={12} className="show-more-section">
          <div
            className="text"
            onClick={() => {
              trackEvent('showmore', 'click', 'Degree_showmore');
              history.push({
                pathname: routingURL,
                state: {
                  filter: filter,
                },
              });
            }}
          >
            Show More
          </div>
        </Grid>
      </Grid>
    );
  }
);
