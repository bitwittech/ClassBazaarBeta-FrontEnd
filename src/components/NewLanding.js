import React from 'react';
import Grid from '@material-ui/core/Grid';

import AppBar from './appBar';
import SearchBG1 from './../assets/Search-option1.jpg';

const NewLanding = () => {
  const Search = withRouter(({ history, ...data }) => {
    const classes = data.classes;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search for a course"
          onChange={data.onSearchChange}
          inputProps={{ 'aria-label': 'search' }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onKeyPress={ev => {
            if (ev.key === 'Enter') {
              const query = data.getQuery;
              history.push({
                pathname: data.routingURL,
                state: {
                  query: query(),
                },
              });
              ev.preventDefault();
            }
          }}
        />
      </div>
    );
  });
  return (
    <>
      <AppBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          minHeight: '60vh',
          background: 'url(' + SearchBG1 + ')',
          backgroundSize: 'cover',
        }}
      >
        <Grid item xs={12}>
          <Search
            getQuery={this.getQuery}
            onSearchChange={this.onSearchChange}
            classes={classes}
            props={this.props}
            routingURL={'/listing'}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default NewLanding;
