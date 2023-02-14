import React, { useState, useEffect } from 'react';
import Footer from '../utils/Footer';
import Navbar from '../utils/Navbar';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

// image
import timer from '../../assets/images/timer.png';
import level from '../../assets/images/time.png';
import content from '../../assets/images/rupee.png';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// apis
import { getCoursesDetails } from '../services/services';

import '../../assets/css/courseDetails.css';
import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
const Details = () => {
  const { uuid, provider } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    getCourse(uuid);
  }, [uuid]);

  async function getCourse() {
    let response = await getCoursesDetails({ uuid, provider });
    setData(response.data.summaryData);
  }

  return (
    <>
      {/* NavBar  */}
      <Navbar />
      {/* NavBar ends */}
      {/* Course Details  */}
      {data !== null ? (
        <Grid container className="courseDetailsContainer">
          <Grid item xs={12}>
            <Typography className=" colorTitle universityTitle" variant="h6">
              {data.university}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="colorTitle courseTitle" variant="h6">
              {data.title}
            </Typography>
          </Grid>
          <Grid item xs={12} className="otherDetails">
            <Grid container p={1} className="secSec">
              <Grid item xs={3} className="infoIcon">
                <img src={timer} alt="timer" />
                <Typography variant="caption">
                  {data.start_date ? data.start_date.split('T')[0] : 'Flexible'}
                </Typography>
              </Grid>
              <Grid item xs={3} className="infoIcon">
                <img src={level} alt="level" />
                <Typography variant="caption">Any</Typography>
              </Grid>
              <Grid item xs={3} className="infoIcon">
                {/* <img src={content} alt="duration" /> */}
                <Typography variant="caption">
                  <CurrencyRupeeIcon />
                  {data.price || 'Free'}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  href={data.url}
                  target="_blank"
                  variant="contained"
                  size={'medium'}
                  className="enrollBTN"
                >
                  Enroll Now
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className="colorTitle courseOverview">
              Course Overview
            </Typography>
          </Grid>
          <br />
          <Grid item xs={12} className="description">
            <Typography variant="body1">
              {ReactHtmlParser(data.description)}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container className="courseDetailsContainer">
          <Grid className={'progress'} xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      )}

      {/* Course Details Ends */}
      {/* Footer  */}
      <Footer />
      {/* Footer ends */}
    </>
  );
};

export default Details;
