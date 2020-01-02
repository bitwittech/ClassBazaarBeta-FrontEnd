import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';

const MobileTopbar = props => {
  const [search, onSearchClick] = useState(false);
  return (
    <div className="no-desktop">
      <div className="cont-profile">
        <div className="search-icon">
          <SearchIcon
            onClick={() => onSearchClick(!search)}
            fontSize="large"
            className="searchicon"
          />
        </div>
        {!search && (
          <>
            {' '}
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
          </>
        )}
        {search && (
          <div className="search-input">
            <input
              className="searchField"
              onChange={props.onSearchChange}
              type="text"
              placeholder="Search for a course"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileTopbar;
