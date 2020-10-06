import React, {Component} from 'react';

import './styles.css';

class SlideNavigator extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentSlide : -1
        };
    }

    handleSlideForward = () => {
        const {
            currentSlide
        } = this.state;

        const nextSlide = currentSlide+1;

        const nextSlideID = this.props.slides[nextSlide];

        if(nextSlideID) {
            this.props.animateToElement(nextSlideID, 1);
            this.setState({currentSlide : nextSlide});
        } else {
            this.props.animateToElement(this.props.slides[currentSlide], 1);
        }

        
    } 

    handleSlideBackwards = () => {
        const {
            currentSlide
        } = this.state;

        const nextSlide = currentSlide-1;

        const nextSlideID = this.props.slides[nextSlide];

        if(nextSlideID) {
            this.props.animateToElement(nextSlideID, 1);
            this.setState({currentSlide : nextSlide});
        } else {
            this.props.animateToElement(this.props.slides[currentSlide], 1);
        }
    } 
  
    render() {

        const slidesPossible = this.props.slides.length > 0;

        const slidesNavStyles = {
            visibility : "visible"
        }

        if(!slidesPossible) {
            slidesNavStyles.visibility = "hidden";
        }

        return (
            <div className={"undoControls"} style={slidesNavStyles}>
                <span 
                    className={"iconButton backward"}
                    onClick={this.handleSlideBackwards}
                />
                <span>Slide {(this.state.currentSlide+1)} of {this.props.slides.length}</span>
                <span 
                    className={"iconButton forward"}
                    onClick={this.handleSlideForward}
                />
            </div>
        );
    }
    
  }

  export default SlideNavigator;