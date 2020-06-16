import React, {Component} from 'react';

import './styles.css';

class Tool extends Component {

  
    handleToolSelect = (e) => {
        this.props.handleToolSelect(this.props.type);
    }

  
    render() {
        return (
            <span 
                className={`toolbar_tool toolbar_${this.props.type}`}
                onClick={this.handleToolSelect}
            />
        );
    }
    
  }


class Toolbar extends Component {
  
    render() {
        const {handleToolSelect} = this.props;
        return (
            <div className="toolbar">
                <Tool type="pan" handleToolSelect={handleToolSelect}/>
                <Tool type="sticky" handleToolSelect={handleToolSelect}/>
                <Tool type="text" handleToolSelect={handleToolSelect}/>
                <Tool type="shape" handleToolSelect={handleToolSelect}/>
                <Tool type="pen" handleToolSelect={handleToolSelect}/>
                <Tool type="image" handleToolSelect={handleToolSelect}/>
                <Tool type="more" handleToolSelect={handleToolSelect}/>
            </div>
        );
    }
    
  }

  export default Toolbar;