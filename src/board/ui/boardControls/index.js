import React, {Component} from 'react';

import UndoRedo from './undoRedo';

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

    handleShareBoard = () => {
        //TODO : crude flag for local dev, needs removing to config vars
        if(window.location.href.indexOf("localhost") !== -1) {
            this.props.toggleBoardShare();
        }
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
                    <span 
                        className={"iconButton share"}
                        onClick={this.handleShareBoard}
                    />
                </div>
                <UndoRedo 
                    handleUpdateElementsAndState={this.props.handleUpdateElementsAndState}
                    elements={this.props.elements}
                    elementState={this.props.elementState}
                    storeUndo={this.props.storeUndo}
                />
            </div>
        );
    }
    
  }

  export default BoardControls;