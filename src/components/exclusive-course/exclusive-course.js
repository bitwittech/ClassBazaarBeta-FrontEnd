import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import DigitalHealth from '../../assets/DignityHealth.png'

export const ExclusiveCourseComponent = withRouter(({ history, exclusiveCourse, trackEvent, filter, routingURL }) => {
  const data = exclusiveCourse.slice(0, 4);
  return (
    <div 
    className={'exclusive-course-wrapper'}>
      <div className="section-title">
        Exclusive Courses
        <div className="bottom-border"/>
      </div>
      <div className="section-sub-title" style={{ marginTop: '20px', marginBottom: '46px' }}>
        <img src={DigitalHealth} alt="DignityHealth" />
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
                'Degree_course',
                'click',
                `${degree.name}`,
              );
            }}>
              <div className="card-inner">
                <div className="head-section">
                  via {degree.provider}
                </div>
                <img src={degree.image}/>
              </div>
              <div className="university-section">
                {degree.university}
              </div>
            </Link>
          );

        })}
      </div>
      <div className="card-section" style={{ marginTop: 0 }}>
        {data.map(degree => {
          return (
            <div className="card-wrapper" style={{ paddingTop: 0 }}>
              <div className="name-section">
                {degree.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
