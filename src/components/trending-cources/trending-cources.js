import React from 'react';
import Grid from '@material-ui/core/Grid';
import { trendingData } from '../../utils/data';
import { withRouter } from 'react-router';

export const TrendingCoursesComponent = withRouter(({ history, trendingData,trackEvent, routingURL,filter }) => {
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
            <div className="card-wrapper">
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

            </div>
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
