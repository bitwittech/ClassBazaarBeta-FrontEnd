import React from 'react';
import Grid from '@material-ui/core/Grid';
import { trendingData } from '../../utils/data';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

export const TrendingCoursesComponent = withRouter(({ history, trendingData, trackEvent, routingURL, filter }) => {
  const data = trendingData.slice(0, 3);
  return (
    <div className={'trending-courses-wrapper'}>
      <div className="section-title">
        Top Trending Courses
        <div className="bottom-border"/>
      </div>
      <div className="card-section">
        {data.map(degree => {
          return (
            <Link to={degree.url ? ('/coursedetails' + degree.url) : {
              pathname: '/coursedetail',
              state: {
                data: degree.data,
              },
            }}
                  className="card-wrapper" onClick={() => {
              trackEvent(
                'Trending_course',
                'click',
                `${degree.name}`,
              );
            }}>
              <div className="card-inner">
                <div className="head-section">
                  via {degree.provider}
                </div>
                <img src={degree.image}/>
                <div className="university-section">
                  {degree.university}
                </div>
                <div className="name-section">
                  {degree.name}
                </div>
              </div>

            </Link>
          );

        })}
      </div>
      <div className="show-more-section">
        <div className="text" onClick={() => {
          trackEvent('showmore', 'click', 'Trending Show More ');
          history.push({
            pathname: routingURL,
            state: {
              filter: filter,
            },
          });
        }}>
          Show More
        </div>
      </div>
    </div>
  );
});
