import React, { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import '../styles/Hamburgur.css';
import { Link, withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { logout } from '../actions/ContextActions';
import Store from '../store/Context';

export default (props) => {
  const { state, dispatch } = useContext(Store);
  const handleLogout = () => {
    // props.history.push('/');
    logout(dispatch);
  };
  return (
    <>
      <Menu className="showHam">
        <>
          <div className="sbar menu" style={{ display: 'inline-block' }}>
            <DebounceInput
              minLength={2}
              className="s-input"
              debounceTimeout={500}
              onChange={props.props.onChange}
              onKeyPress={props.props.onKeyPress}
              placeholder="Search for a course"
              value={props.props.initialSearchValue}
            />
          </div>
        </>
        <Link
          to={'/'}
          variant="outlined"
          color="primary"
          className="side-bar-list-colore"
        >
          Home
        </Link>
        <Link
          to={'/listing'}
          variant="outlined"
          color="primary"
          className="side-bar-list-colore"
        >
          Courses
        </Link>
        <Link
          to={'/about'}
          variant="outlined"
          color="primary"
          className="side-bar-list-colore"
        >
          About Us
        </Link>
        <Link
          to={'/contact'}
          style={{ marginRight: '10px' }}
          variant="outlined"
          color="primary"
          className="side-bar-list-colore"
        >
          Contact
        </Link>
        <Link
          to={'/career'}
          style={{ marginRight: '10px' }}
          variant="outlined"
          color="primary"
          className="side-bar-list-colore"
        >
          Career
        </Link>
        {localStorage.getItem('user') !== null ? (
          <Link
            to={'/'}
            onClick={() => handleLogout()}
            variant="outlined"
            color="primary"
            className="side-bar-list-log"
          >
            Logout
          </Link>
        ) : null}
      </Menu>
    </>
  );
};
