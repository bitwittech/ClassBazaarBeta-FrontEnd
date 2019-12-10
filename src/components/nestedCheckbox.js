import React, { Component } from 'react';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  sizeIcon: {
    fontSize: '0.9rem',
  },
});

class NestedMenu extends Component {
  constructor(props) {
    super(props);
    console.log('Inside constructor');
    console.log(this.props);
    this.state = {
      checkedLevel1: this.props.isLevel1Checked,
      checkedLevel2: this.props.level2List.map(c => false),
      level1Name: this.props.level1Name,
      level2List: this.props.level2List,
      isOnlyOneAllowed: this.props.isOnlyOneAllowed,
    };

    this.handleChangeLevel1 = this.handleChangeLevel1.bind(this);
    this.handleChangeLevel2 = this.handleChangeLevel2.bind(this);
  }
  handleChangeLevel1 = event => {
    //   When this is not checked remove all filter assocaited with it.
    if (!event.target.checked)
      this.props.onChangeOptions(this.props.level2List.map(c => false));
    this.setState({ checkedLevel1: event.target.checked });
  };

  handleChangeLevel2 = index => event => {
    let checkedLevel2 = this.state.checkedLevel2;
    if (this.state.isOnlyOneAllowed) {
      checkedLevel2 = checkedLevel2.map(s => false);
    }
    checkedLevel2[index] = event.target.checked;
    console.log(checkedLevel2);
    this.props.onChangeOptions(checkedLevel2);
    this.setState({ checkedLevel2 });
  };

  componentWillReceiveProps(nextProps) {
    console.log('Inside componentWillReceiveProps', this.props === nextProps);
    if (this.props !== nextProps && nextProps.shouldReset) {
      this.setState({
        checkedLevel1: false,
        checkedLevel2: nextProps.level2List.map(s => false),
      });
    }
    if (this.props !== nextProps && nextProps.shouldUpdate) {
      this.setState({
        checkedLevel1: nextProps.isLevel1Checked,
        checkedLevel2: nextProps.checkedLevel2,
      });
    }
  }

  render() {
    return (
      <div>
        <FormControl component="fieldset" className={styles.formControl}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: '#FFA502' }}
                  checked={this.state.checkedLevel1}
                  onChange={this.handleChangeLevel1}
                  value={this.state.checkedLevel1}
                  inputProps={{
                    'aria-label': 'primary checkbox',
                  }}
                />
              }
              label={this.state.level1Name}
            />
            {this.state.checkedLevel1 && (
              <div>
                {this.state.level2List.map((obj, index) => (
                  <Grid item xs={12} style={{ paddingLeft: 20 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ color: '#FFA502' }}
                          checked={this.state.checkedLevel2[index]}
                          onChange={this.handleChangeLevel2(index)}
                          value={this.obj}
                          color="primary"
                          inputProps={{
                            'aria-label': 'secondary checkbox',
                          }}
                        />
                      }
                      label={
                        <Typography style={{ fontSize: '0.87rem' }}>
                          {this.state.level2List[index]}
                        </Typography>
                      }
                    />
                  </Grid>
                ))}
              </div>
            )}
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

NestedMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedMenu);
