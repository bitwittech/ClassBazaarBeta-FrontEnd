import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Button,
  Fade,
  Modal,
  Backdrop,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

// image
import topVector from '../../assets/images/topVector.png';
import timer from '../../assets/images/timer.png';
import level from '../../assets/images/level.png';
import content from '../../assets/images/content.png';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

// css
import '../../assets/css/courseList.css';
import '../../assets/css/utility.css';
import { getCourses } from '../services/services';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
const CourseList = (props) => {
  // var url = `${API}/api/v2/courses/?q=${query}&filter=${parsedFilter}&subjects=${subjects}&provider=${this.state.providers}&feeFilter=${feeFilter}&startDateFilter=${startDateFilter}`;

  const [data, setData] = useState([]);
  // state of the everything
  const [meta, setMeta] = useState({
    hasMore: true,
    fireFilter: false,
    offset: {
      Udemy: 0,
      edX: 0,
      Future_Learn: 0,
      Coursera: 0,
    },
  });

  const { auth } = useSelector((state) => state);

  const { search } = useParams();

  const [filter, setFilter] = useState({
    open: false,
    search: search,
  });

  useEffect(() => {
    fetchData();
  }, [meta.fireFilter]);

  async function fetchData() {
    try {
      if (meta.fireFilter) {
        setData([]);
      }
      let response = await getCourses({
        filter: filter,
        offset: meta.offset,
      });
      if (response.status === 200) {
        if (response.data.data.length > 0) {
          setMeta((old) => ({ hasMore: true, offset: response.data.offset }));
          setData((old) => [...old, ...response.data.data]);
        } else {
          setMeta((old) => ({ hasMore: false, offset: response.data.offset }));
        }
      }
    } catch (err) {
      console.log('err>>', err);
    }
  }

  function handleFilter() {
    setFilter((old) => ({ ...old, open: true }));
  }

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* navbar ends */}
      {/* filter model box */}
      <Filter
        filter={filter}
        setFilter={setFilter}
        meta={meta}
        setMeta={setMeta}
      />
      {/* filter model box ends */}
      {/* main Section  */}
      <Grid container className="cardContainer">
        <Grid item xs={6}>
          <Typography className="courseListHeading b6">Top Courses</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleFilter}
            size="small"
            variant="contained"
            className="filterBtn"
          >
            Filter
          </Button>
        </Grid>
        {/* // ye kar pada because MUI mt support nhi kar rha he */}

        <Grid item xs={12} mt={5}>
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={meta.hasMore}
            // style={styleStroller}
            loader={
              <center style={{ padding: '10px' }}>
                <CircularProgress />
              </center>
            }
          >
            <Box className="cardContainer_inner">
              {data && data.map((row) => <Card row={row} auth={auth} />)}
            </Box>
          </InfiniteScroll>
        </Grid>
      </Grid>
      {/* main Section ends */}
      {/* footer  */}
      <Footer />
      {/* footer  ends */}
    </>
  );
};

// card Template
function Card({ row, auth }) {
  return (
    <Box
      className="card_otter"
      component={Link}
      to={auth.isAuth ? `/courseDetails/${row.provider}/${row.uuid}` : '/login'}
    >
      <img src={topVector} className="cardImage" alt="design" />
      <Grid container className="course_card">
        <Grid item xs={12} className="card_title allPad">
          <Typography variant="h5" className="b6">
            {row.title}
          </Typography>
        </Grid>
        <Grid item xs={12} className="allPad">
          <Grid container p={1} className="secSec">
            <Grid item xs={4} className="infoIcon">
              <img src={timer} alt="timer" />
              <Typography variant="caption">
                {row.start_date ? row.start_date.split('T')[0] : 'flexible'}
              </Typography>
            </Grid>
            <Grid item xs={4} className="infoIcon">
              <img src={level} alt="level" />
              <Typography variant="caption">Any</Typography>
            </Grid>
            <Grid item xs={4} className="infoIcon">
              <img src={content} alt="duration" />
              <Typography variant="caption">{row.provider}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="allPad">
          <Grid container className="thirdSec">
            <Grid item xs={8} className="universityClip">
              <Typography variant="caption">
                {row.university !== '' ? row.university : row.provider}
              </Typography>
            </Grid>
            <Grid item xs={4} className="price">
              <Typography variant="caption">
                {row.price
                  ? row.price.toLocaleString('us-Rs', {
                      style: 'currency',
                      currency: 'INR',
                    })
                  : 'Free'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

// filter Box
function Filter({ filter, setFilter, meta, setMeta }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fitContent',
    bgcolor: 'background.paper',
    boxShadow: 24,
  };

  function handleFilter(e) {
    console.log(e.target.name);
    console.log(e.target.checked);
    setFilter((old) => ({ ...old, [e.target.name]: e.target.checked }));
  }

  function fireFilter(e) {
    setMeta((old) => ({
      ...old,
      fireFilter: !old.fireFilter,
      hasMore: true,
      offset: {
        Udemy: 0,
        edX: 0,
        Future_Learn: 0,
        Coursera: 0,
      },
    }));
    setFilter((old) => ({ ...old, open: false }));
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={filter.open}
      onClose={() => {
        setFilter((old) => ({ ...old, open: false }));
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={filter.open}>
        <Box sx={style} className="filterBox">
          <img src={topVector} className="cardImage" alt="design" />
          <Grid container className="filterInner">
            {/* // Provider */}
            <Grid item xs={3}>
              <Typography className="filterTitle">Provider</Typography>
              <FormGroup>
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.Udemy}
                      size={'small'}
                      color="primary"
                      name="Udemy"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Udemy"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.edX}
                      size={'small'}
                      color="primary"
                      name="edX"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="edX"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.Future_Learn}
                      size={'small'}
                      name="Future_Learn"
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Future Learn"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.Coursera}
                      size={'small'}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon />}
                      name="Coursera"
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Coursera"
                />
              </FormGroup>
            </Grid>
            {/* Fees  */}
            <Grid item xs={3}>
              <Typography className="filterTitle">Fees</Typography>
              <FormGroup>
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.Free}
                      size={'small'}
                      color="primary"
                      name="Free"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Free"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.Paid}
                      size={'small'}
                      color="primary"
                      name="Paid"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Paid"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.Subscription}
                      size={'small'}
                      name="Subscription"
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Provider Subscription"
                />
              </FormGroup>
            </Grid>
            {/* Start Date  */}
            <Grid item xs={3}>
              <Typography className="filterTitle">Start Date</Typography>
              <FormGroup>
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.withIn30}
                      size={'small'}
                      color="primary"
                      name="withIn30"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Start With In 30 Days"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.after30}
                      size={'small'}
                      color="primary"
                      name="after30"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Start After 30 Days"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <Checkbox
                      checked={filter.Flexible}
                      size={'small'}
                      name="Flexible"
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Flexible"
                />
              </FormGroup>
            </Grid>
            {/* Subjects  */}
            {/* <Grid item xs={3}>
              <Typography className="filterTitle">Subjects</Typography>
              <FormGroup>
                <FormControlLabel
                  className="filterLable"
                  control={
                    <CheckBox checked = {}
                      size={'small'}
                      color="primary"
                      name="Udemy"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Udemy"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <CheckBox checked = {}
                      size={'small'}
                      color="primary"
                      name="edX"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="edX"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <CheckBox checked = {}
                      size={'small'}
                      name="Future Learn"
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Future Learn"
                />
                <FormControlLabel
                  className="filterLable"
                  control={
                    <CheckBox checked = {}
                      size={'small'}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon />}
                      name="Coursera"
                      checkedIcon={<AddBoxIcon />}
                      onChange={handleFilter}
                    />
                  }
                  label="Coursera"
                />
              </FormGroup>
            </Grid> */}

            <Grid item xs={12}>
              <Button size={'small'} onClick={fireFilter} className="filterBtn">
                Apply
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}

export default CourseList;
