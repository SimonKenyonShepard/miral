import React, {PureComponent} from 'react';

//ELEMENTS
import Shape from './shape';
import Text from './text';
import Postit from './postit';
import Line from './line';
import Image from './image';
import Slide from './slide';
import Link from './link';
import Youtube from './youtube';


class Elements extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {
       
      };
    }

    render() {
        const {
            elements,
            elementState,
            handleTextEdit,
            handleSetCurrentElement,
            isSelected,
            isUniqueSelected,
            zoomLevel,
            animateToElement,
            loadRemoteBoard
        } = this.props;

        const slides = [];

        const elementNodes = Object.keys(elements).map(elementID => {
            const element = elements[elementID];
            const lowDetail = (element.styles.width/zoomLevel < 20) && (element.styles.height/zoomLevel < 20);
            if (element.type === "shape") {
                return (<Shape
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleTextEdit={handleTextEdit}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    lowDetail={lowDetail}
                />);
            } else if (element.type === "text") {
                return (<Text 
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleTextEdit={handleTextEdit}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    isUniqueSelected={isUniqueSelected}
                    lowDetail={lowDetail}
                />);
            } else if (element.type === "postit") {
                return (<Postit
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleTextEdit={handleTextEdit}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    lowDetail={lowDetail}
                />);
            } else if (element.type === "line") {
                return (<Line
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleTextEdit={handleTextEdit}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    lowDetail={lowDetail}
                />);
            } else if (element.type === "image") {
                return (<Image
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleTextEdit={handleTextEdit}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    lowDetail={lowDetail}
                />);
            } else if (element.type === "slide") {
                slides.push(element.id);
                return (<Slide
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleTextEdit={handleTextEdit}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    slideNumber={slides.length}
                    lowDetail={lowDetail}
                />);
            } else if (element.type === "link") {
                slides.push(element.id);
                return (<Link
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    lowDetail={lowDetail}
                    animateToElement={animateToElement}
                    loadRemoteBoard={loadRemoteBoard}
                />);
            } else if (element.type === "youtube") {
                return (<Youtube
                    key={element.id}
                    data={element}
                    styles={element.styles}
                    fontStyles={element.fontStyles}
                    elementState={elementState[element.id]}
                    handleTextEdit={handleTextEdit}
                    handleSetCurrentElement={handleSetCurrentElement}
                    isSelected={isSelected}
                    lowDetail={lowDetail}
                />);
            }
            return null;
        });
        
        return (
            <>
                {elementNodes}
            </>
        );
    }

    
  }

  export default Elements;