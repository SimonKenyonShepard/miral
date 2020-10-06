import React, {Component} from 'react';

import Share from './share';
import UndoRedo from './undoRedo';
import SlideNavigator from './slideNavigator';

import './styles.css';


class BoardControls extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          editBoardName : false,
        };
      }
    
    handleEditBoardName = () => {
        this.setState({
            editBoardName : true
        });
    };

    handleBlur = (e) => {
        this.props.updateBoardName(e.target.innerText);
        this.setState({
            editBoardName : false
        });
    }
    
    render() {

        const {
            editBoardName
        } = this.state;

        let contentEditable = false;

        if(editBoardName) {
            contentEditable = true;
        }

        return (
            <div className={"boardControls"}>
                <div className={"primaryControls"}>
                    <span 
                        className={"boardName"} 
                        contentEditable={contentEditable}
                        onClick={this.handleEditBoardName}
                        onBlur={this.handleBlur}
                        suppressContentEditableWarning={true}
                    >{this.props.boardName}</span>
                    <Share 
                        toggleBoardShare={this.props.toggleBoardShare}
                    />
                </div>
                <UndoRedo 
                    handleUpdateElementsAndState={this.props.handleUpdateElementsAndState}
                    elements={this.props.elements}
                    elementState={this.props.elementState}
                    storeUndo={this.props.storeUndo}
                />

                <SlideNavigator 
                    slides={this.props.slides}
                    animateToElement={this.props.animateToElement}
                />
            </div>
        );
    }
    
  }

  export default BoardControls;