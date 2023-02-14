// /* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
// import { AutoComplete } from '@material-ui/core';
import { Autocomplete, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
// import {Link} from 'react-router-dom';
// css
import '../../assets/css/home.css';
// images
import banner from '../../assets/images/home_banner.png';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../../assets/images/colors-fork.png';
import computer from '../../assets/images/computer-science.png';
import data from '../../assets/images/data-analysis.png';
import earth from '../../assets/images/earth-globe-rotating-with-seamless-loop-animation.png';
import green from '../../assets/images/green-calculator.png';
import health from '../../assets/images/health-and-fitness.png';
import javascript from '../../assets/images/javascript.png';
import puzzle from '../../assets/images/puzzle.png';
import science from '../../assets/images/science-loader.png';
import goggle from '../../assets/images/google-logo-icon-png-transparent-background-osteopathy.png';
import harward from '../../assets/images/Harvard_shield_wreath.png';
import coursera from '../../assets/images/coursera-logo.png';
import img1 from '../../assets/edubuk/1.png';
import img2 from '../../assets/edubuk/2.png';
import img3 from '../../assets/edubuk/3.png';
import img4 from '../../assets/edubuk/4.png';
import text1 from '../../assets/edubuk/text1.png';
import text3 from '../../assets/edubuk/text3.png';
import text4 from '../../assets/edubuk/text4.png';
import text5 from '../../assets/edubuk/text5.png';
// component
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
// FRC Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// data
import { FRD } from '../../../utils/data'; // old components utils
// APIs
import { search } from '../../../service/commonService';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

export default function Home(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearch] = useState('');
  // const history = useHistory();

  const secondSectionImages = [
    colors,
    computer,
    data,
    earth,
    green,
    health,
    javascript,
    puzzle,
    science,
    science,
  ];
  const secondSectionLabel = [
    'colors',
    'computer',
    'data',
    'earth',
    'green',
    'health',
    'javascript',
    'puzzle',
    'science',
    'science',
  ];

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = async (value) => {
    let result = await search(value);
    setSearch(value);
    setSuggestions(result.data.data);
  };

  const fireSearch = () => {
    console.log(searchValue);
    props.history.push(`/listing/${searchValue}`);
    // return history.push(`/listing`);
  };

  const searchOut = useCallback(debounce(handleChange), []);

  return (
    <>
      {/* navbar   */}
      <Navbar />
      {/* navbar ends */}
      {/* first section Banner  */}
      <Box className="topContainer">
        {/* // text and banner */}
        <Box className="topTextContainer">
          {/* heading */}
          <Typography className="topGradient heading">
            We Believe in Passion of Learning
          </Typography>
          <Typography className="topGradient" variant="button">
            LEARN FROM WORLD’S BEST PROFESSIONALS
          </Typography>
          <Box className="searchContainer">
            {/* bar */}
            <Autocomplete
              className="searchBar"
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              onChange={(e, val) => {
                setSearch(val);
              }}
              size="small"
              options={suggestions.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Input"
                  variant="outlined"
                  onChange={(e) => {
                    searchOut(e.target.value);
                    setSearch(e.target.value);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            {/* // button */}
            <IconButton
              // component={Link}
              // to={{
              //   pathname: '/listing',
              //   state: search,
              // }}
              onClick={fireSearch}
              className="searchButton"
            >
              <SearchIcon></SearchIcon>
            </IconButton>
          </Box>
          <Box className="extraButton">
            <Button size="small" className="searchBtn" variant="contained">
              Free Certificate
            </Button>
            <Button size="small" className="searchBtn" variant="contained">
              Free Courses
            </Button>
            <Button size="small" className="searchBtn" variant="contained">
              EDX
            </Button>
            <Button size="small" className="searchBtn" variant="contained">
              Udemy
            </Button>
          </Box>
        </Box>
        {/* // text and banner ends */}
        {/* photo */}
        <Box className="topBannerContainer">
          <img src={banner} alt="banner_image" />
        </Box>
        {/* photo ends */}
      </Box>
      {/* first section Banner ends */}

      {/* second section Banner  */}
      <Grid container className="secondContainer">
        <Grid item xs={12}>
          <Typography className="secGradient">
            Find courses on any topic
          </Typography>
        </Grid>
        <Grid item xs={12} p={3}>
          <Typography variant="caption">
            Discover best online courses from top universities around the world
            like MIT, Stanford, Harvard, IIT and many more.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className="secondImageSection">
            {secondSectionImages.map((image, key) => (
              <Box key={key} className="secCard" xs={12} md={2.5}>
                <img src={image} alt={key} />
                <Typography variant="button">
                  {secondSectionLabel[key]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      {/* second section Banner ends  */}

      {/* third section Banner   */}
      <FutureReadyCourse />
      {/* third section Banner ends  */}

      {/* fourth section */}
      <BestCourses />
      {/* fourth section  ends*/}

      {/* fifth section  */}
      <TakeTest />
      {/* fifth section ends */}

      {/* footer  */}
      <Footer />
      {/* footer ends  */}
    </>
  );
}

function FutureReadyCourse() {
  const data = FRD;
  const { auth } = useSelector((state) => state);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
    <>
      <Grid container className="FRC_container">
        <Grid item xs={12}>
          <Typography className="FRC_show_more">Show More</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography className="FRC_title">Future Ready Courses</Typography>
        </Grid>
        <Grid item xs={12} md={9} className="FRC_card">
          <Carousel
            className="card-section"
            dotListClass="custom-dot-list-style"
            keyBoardControl={true}
            autoPlaySpeed={1000}
            ssr={true}
            infinite={true}
            responsive={responsive}
          >
            {data.map((degree, key) => {
              return (
                <Box
                  className="outer_card"
                  component={Link}
                  to={auth.isAuth ? `/courseDetails${degree.url}` : '/login'}
                >
                  <Box className="card_img">
                    <img src={degree.icon} alt={key} />
                  </Box>
                  <div className="name-section">{degree.name}</div>
                </Box>
              );
            })}
          </Carousel>
        </Grid>
      </Grid>
    </>
  );
}

function BestCourses() {
  const university = [
    'Yale Universities',
    'Harvard Universities',
    'Duke Universities',
    'Stanford Universities',
  ];
  const provider = ['Udemy', 'Coursera', 'Future Lrarn', 'Edx'];
  const institution = ['Google', 'You Tube', 'Insta', 'Facebook'];

  return (
    <>
      <Grid container className="fourthContainer">
        <Grid item xs={12}>
          <Typography className="fourthHeading">
            Find The Best Courses
          </Typography>
        </Grid>
        <Grid item xs={12} p={3} className="listSection">
          <Grid container className="listContainer">
            <Grid item xs={12} md={3} className="listBox">
              <Typography variant="h5">1000+ Universities</Typography>
              <Stack>
                {university.map((row, key) => (
                  <Box className="list">
                    <img src={harward} alt="university_image" />
                    <Typography key={key} variant="button">
                      {row}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3} className="listBox">
              <Typography variant="h5">70 Providers</Typography>
              <Stack>
                {provider.map((row, key) => (
                  <Box className="list">
                    <img src={coursera} alt="university_image" />
                    <Typography key={key} variant="button">
                      {row}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3} className="listBox">
              <Typography variant="h5">600+ Institutions</Typography>
              <Stack>
                {institution.map((row, key) => (
                  <Box className="list">
                    <img src={goggle} alt="university_image" />
                    <Typography key={key} variant="button">
                      {row}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

function TakeTest() {
  return (
    <>
      <Grid container className="fifthContainer">
        <Grid item xs={12} className="fifthImage">
          <Box className="eduImageCOntainer">
            <Box className="itemIMG">
              <img src={img1} alt="img1" />
              <img className="textImg img1 " src={text1} alt="img1" />
            </Box>
            <Box className="itemIMG">
              <img src={img2} alt="img2" />
            </Box>
            <Box className="itemIMG">
              <img src={img3} alt="img3" />
              <img className="textImg img3 " src={text3} alt="img3" />
            </Box>
            <Box className="itemIMG">
              <img src={img4} alt="img4" />
              <img className="textImg img4" src={text4} alt="img3" />
            </Box>
            <Box className="itemIMG">
              <img src={img3} alt="img5" />
              <img className="textImg img5 " src={text5} alt="img5" />
            </Box>
          </Box>
        </Grid>
        <br></br>
        <Grid item xs={12}>
          <Typography className="fifthHeading">
            Skills you need to be ready for the next wave of emerging
            technology.
          </Typography>
          <center>
            <Typography className="subFifthHeading" variant="button">
              With the most popular and trusted career mappingtest for FREE!
            </Typography>
          </center>
        </Grid>
        <Grid item xs={12} className="fifthContainer">
          <center>
            <Button component={Link} to={'/edubuk'} variant="contained">
              See Test
            </Button>
          </center>
        </Grid>
      </Grid>
    </>
  );
}
