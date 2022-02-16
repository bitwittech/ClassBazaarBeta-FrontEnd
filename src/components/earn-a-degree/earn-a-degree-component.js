import React ,{useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Pre_LOG_Box } from '../../store/Types';
import Store from '../../store/Context';



export const EarnADegreeComponent = withRouter(({ history, degreeData, trackEvent, filter, routingURL }) => {
  const { state, dispatch } = useContext(Store);
  const {isAuth} = state;
  const data = degreeData.slice(0, 4);
   // Append by yashwant sahu 
  
   const OpenLogin = () => {

    if(isAuth === false)
    {
      return dispatch({
        type: Pre_LOG_Box,
        payload: {
          state: 1,
          open: true,
        },
      });
    }
  }
  return (
    <div className={'earn-a-degree-wrapper'}>
      <div className="section-title">
        Earn a Certificate
        <div className="bottom-border"/>
      </div>
      <div className="section-sub-title">
        Launch yourself in your career with an online degree. Did you know many
        of the universities’ issue certificates which don’t even mention “taken
        online” on them.
      </div>
      <div className="card-section">
        {data.map(degree => {
          return (
            <Link  to={degree.url ? ('/coursedetails' + degree.url) : {
              pathname: '/coursedetail',
              state: {
                data: degree.data,
              },
            }}
                  className="card-wrapper" onClick={() => {
                    OpenLogin()
              trackEvent(
                'Degree_course',
                'click',
                `${degree.name}`,
              );
            }}>
              <div className="card-inner" >
                <div className="head-section">
                  via {degree.provider}
                </div>
                <img src={degree.image}/>
              </div>
              <div className="university-section">
                {degree.university}
              </div>
              <div className="name-section">
                {degree.name}
              </div>
            </Link>
          );

        })}
      </div>
      <div className="card-section" style={{ marginTop: 0 }}>
        {data.map(degree => {
          return (
            <div className="card-wrapper" style={{ paddingTop: 0 }}>
              
            </div>
          );
        })}
      </div>
      <div className="show-more-section">
        <div className="text" onClick={() => {
          trackEvent('showmore', 'click', 'Degree_showmore');
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
