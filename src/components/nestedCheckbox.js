import Checkbox from '@material-ui/core/Checkbox';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(3),
  },
});

class NestedMenu extends Component {
  constructor(props) {
    super(props);
    console.log('Inside constructor');
    console.log(this.props);
    this.state = {
      checkedLevel1: false,
      checkedLevel2: this.props.level2List.map(c => false),
      level1Name: this.props.level1Name,
      level2List: this.props.level2List,
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
    const checkedLevel2 = this.state.checkedLevel2;
    checkedLevel2[index] = event.target.checked;
    console.log(checkedLevel2);
    this.props.onChangeOptions(checkedLevel2);
    this.setState({ checkedLevel2 });
  };

  render() {
    return (
      <div>
        <FormControl component="fieldset" className={styles.formControl}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: '#FFA502' }}
                  checked={this.state.checkedA}
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
                      label={this.state.level2List[index]}
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
