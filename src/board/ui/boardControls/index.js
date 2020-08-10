import React, {Component} from 'react';

import UndoRedo from './undoRedo';

import './styles.css';


class BoardControls extends Component {
  
    
    render() {
        const today = new Date().toLocaleDateString().replace(/\//g, "");

        return (
            <div className={"boardControls"}>
                <div className={"primaryControls"}>
                    <span className={"boardName"}>new-board-{today}</span>
                    <span className={"iconButton share"}></span>
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