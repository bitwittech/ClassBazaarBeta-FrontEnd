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

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getUniversityForUdemy = this.getUniversityForUdemy.bind(this);
    }
    

    componentDidMount() {
        var url = `http://35.224.4.2/api/courses/udemy`;
        fetch(url).then(
          response => response.json()
        ).then(
          json => {
            console.log(json);
            this.setState({data: json.data});
          }
        );
      }

    getUniversityForUdemy(obj){
        let names = obj.visible_instructors.map(i => i.name + ", ").join("");
        return names.slice(0, names.length-2);
    }

    render(){
        return (
            <div>
                {this.state.data.length > 0 &&
                 this.state.data.map((obj, index) => {
                    return (<CourseCard
                        key={obj.title}
                        isInstructor={true}
                        university={this.getUniversityForUdemy(obj)}
                        courseName={obj.title} 
                        provider={"Udacity"}
                        duration={obj.content_info}
                        startingOn={"Flexible"}
                        price={obj.discount.price.price_string}
                        rating={Math.round(obj.avg_rating*10)/10}>
                    </CourseCard>)
                 })
                }
                
            </div>
        );
    }
}

HomePage.propTypes = {
    // classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(HomePage);

