import React, {Component} from 'react';

import './styles.css';

class SlideNavigator extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentSlide : 0
        };
    }

    handleSlideForward = () => {
        const {
            currentSlide
        } = this.state;

        const nextSlide = currentSlide+1;

        const slides = this.props.getSlides();

        const nextSlideID = slides[nextSlide];

        if(nextSlideID) {
            this.props.animateToElement(nextSlideID, 1);
            this.setState({currentSlide : nextSlide});
        } else {
            this.props.animateToElement(slides[currentSlide], 1);
        }

        
    } 

    handleSlideBackwards = () => {
        
        const {
            currentSlide
        } = this.state;

        const nextSlide = currentSlide-1;

        const slides = this.props.getSlides();

        const nextSlideID = slides[nextSlide];

        if(nextSlideID) {
            this.props.animateToElement(nextSlideID, 1);
            this.setState({currentSlide : nextSlide});
        } else {
            this.props.animateToElement(slides[currentSlide], 1);
        }
    } 
  
    render() {

        const {
            currentSlide
        } = this.state;

        const slides = this.props.getSlides();

        const slidesPossible = slides.length > 0;

        const slidesNavStyles = {
            visibility : "visible"
        }

        if(!slidesPossible) {
            slidesNavStyles.visibility = "hidden";
        }
        //TOTEST : Buttons are disabled when user cannot go to next slide
        let slideBackwardsDisabled = "buttonDisabled";
        if(currentSlide !== 0) {
            slideBackwardsDisabled = "";
        }

        let slideForwardsDisabled = "buttonDisabled";
        if(currentSlide < slides.length-1) {
            slideForwardsDisabled = "";
        }

        return (
            <div className={"undoControls"} style={slidesNavStyles}>
                <span 
                    className={`iconButton backward ${slideBackwardsDisabled}`}
                    onClick={this.handleSlideBackwards}
                />
                <span>Slide {(this.state.currentSlide+1)} of {slides.length}</span>
                <span 
                    className={`iconButton forward ${slideForwardsDisabled}`}
                    onClick={this.handleSlideForward}
                />
            </div>
        );
    }
    
  }

  export default SlideNavigator;