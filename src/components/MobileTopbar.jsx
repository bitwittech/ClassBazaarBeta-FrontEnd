import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
const MobileTopbar = () => {
  return (
    <div className="no-desktop">
      <div className="cont-profile">
        <div>
          <SearchIcon fontSize="large" className="searchicon" />
        </div>
        <div className="profile-topbar-text">
          <Typography align="center" variant="h6" gutterBottom>
            My Profile
          </Typography>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MobileTopbar;
