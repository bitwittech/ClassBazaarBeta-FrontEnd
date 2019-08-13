import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CourseCard from './courseCard';

const styles = {
    dashboardLink: {
        color: 'white',
    },
    brandingContainer: {
        marginTop: "2%",
    },
    subHeading: {
        position: "absolute",
        bottom: "20%",
        color: 'white',
        fontSize: "1rem"
    }
};

class HomePage extends Component {

    render(){
        return (
            <div>
                <CourseCard 
                    university={"Georgia Institute of Technology"} 
                    courseName={"Machine Learning: Unsupervised Learning"} 
                    provider={"Udacity"}
                    
                    rating={4.7}>
                </CourseCard>
            </div>
        );
    }
}

HomePage.propTypes = {
    // classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(HomePage);

