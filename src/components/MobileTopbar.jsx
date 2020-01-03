import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { withRouter } from 'react-router-dom';
const MobileTopbar = props => {
  const [search, onSearchClick] = useState(false);
  const [q, setQ] = useState(null);
  return (
    <div className="no-desktop">
      <div className="cont-profile">
        <div className="search-icon">
          <SearchIcon
            onClick={() => (!props.onlySearch ? onSearchClick(!search) : null)}
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
        {search && !props.onlySearch && (
          <div className="search-input">
            <input
              className="searchField"
              onChange={props.onSearchChange}
              value={props.q}
              type="text"
              placeholder="Search for a course"
            />
          </div>
        )}
        {props.onlySearch && (
          <div className="searchinput-1">
            <input
              type="text"
              className="search-in"
              onChange={e => setQ(e.target.value)}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  props.history.push({
                    pathname: '/listing',
                    state: {
                      query: q,
                    },
                  });
                  ev.preventDefault();
                }
              }}
              placeholder="Search for a course"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(MobileTopbar);
