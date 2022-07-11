import React, { useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import { trendingData } from '../../utils/data';
import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Pre_LOG_Box } from '../../store/Types';
import Store from '../../store/Context';

export const LearnForFreeComponent = withRouter(
  ({ history, trendingData, trackEvent, routingURL, filter }) => {
    const { state, dispatch } = useContext(Store);
    const { isAuth } = state;
    const data = trendingData.slice(0, 3);

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
    return (
      <div
        className={'trending-courses-wrapper'}
        style={{ backgroundColor: '#fff3ef' }}
      >
        <div className="section-title">
          Learn for Free
          <div className="bottom-border" />
        </div>
        <div className="card-section">
          {data.map((degree) => {
            return (
              <div
                className="card-wrapper"
                onClick={() => {
                  if (isAuth === false) {
                    OpenLogin();
                    trackEvent('Learn-for-free', 'click', `${degree.name}`);
                  } else {
                    trackEvent('Learn-for-free', 'click', `${degree.name}`);
                    history.push({
                      pathname: '/coursedetails' + degree.url,
                    });
                  }
                }}
              >
                <div className="card-inner">
                  <div className="head-section">via {degree.provider}</div>
                  <img src={degree.image} />
                </div>
                <div className="university-section">{degree.university}</div>
                <div className="name-section">{degree.name}</div>
              </div>
            );
          })}
        </div>
        <div className="show-more-section">
          <div
            className="text"
            onClick={() => {
              trackEvent('showmore', 'click', 'Free Show More');
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
        </div>
      </div>
    );
  }
);
