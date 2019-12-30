import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';

const MobileTopbar = props => {
  return (
    <div className="no-desktop">
      <div className="cont-profile">
        <div>
          <SearchIcon fontSize="large" className="searchicon" />
        </div>
        <div className="profile-topbar-text">
          <Typography align="center" variant="h6" gutterBottom>
            {props.title}
          </Typography>
        </div>
        <div>
          {props.filter ? (
            <FilterListIcon
              onClick={() => {
                props.handleFilterClick();
              }}
              fontSize="large"
              className="searchicon"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MobileTopbar;
