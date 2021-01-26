import React, {Component} from 'react';
import Shortid from 'shortid';

import './styles.css';

const iconColor = "#333";

class ElementGroup extends Component {

    areElementsAlreadyGrouped = () => {
      const { elements } = this.props;
        
      let areGrouped = true;

      if(elements[0].groups.length) {
        const lastGroup = elements[0].groups[elements[0].groups.length-1]; 
        elements.forEach(element => {
          if(element.groups.length) {
            if(element.groups[element.groups.length-1] !== lastGroup) {
              areGrouped = false;
            }
          } else {
            areGrouped = false;
          }
          
        })
      } else {
        areGrouped = false;
      }
      return areGrouped;
    }

    handleToggleGroup = () => {
      const areGrouped = this.areElementsAlreadyGrouped();

      if(!areGrouped) {
        this.props.handleUpdateElementProperty({
          update : {
            groups : [Shortid.generate()]
          }
        });
      } else {
        const { elements } = this.props;
        const lastGroup = elements[0].groups[elements[0].groups.length-1];
        this.props.handleUpdateElementProperty({
          remove : {
            groups : [lastGroup]
          }
        });
      }
      
    }

    render() {
      
      const areGrouped = this.areElementsAlreadyGrouped();

      return (
        <div className={"editor_option"}>
          <div 
            className={"editor_icon"} 
            onClick={this.handleToggleGroup}
            title={(!areGrouped ? "Group these elements" : "Ungroup these elements")}
          >
            {!areGrouped ?
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="m23,7l0,-6l-6,0l0,2l-10,0l0,-2l-6,0l0,6l2,0l0,10l-2,0l0,6l6,0l0,-2l10,0l0,2l6,0l0,-6l-2,0l0,-10l2,0zm-20,-4l2,0l0,2l-2,0l0,-2zm2,18l-2,0l0,-2l2,0l0,2zm12,-2l-10,0l0,-2l-2,0l0,-10l2,0l0,-2l10,0l0,2l2,0l0,10l-2,0l0,2zm4,2l-2,0l0,-2l2,0l0,2zm-2,-16l0,-2l2,0l0,2l-2,0z" fill={iconColor}/>
                <rect fill="none" height="5.5" id="svg_2" stroke={iconColor} width="5.5" x="8" y="10.22656"/>
                <rect fill="none" height="5.5" id="svg_3" stroke={iconColor} width="5.5" x="11.25" y="7.72656"/>
              </svg>
              :
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <rect fill="none" height="9.25"  stroke={iconColor} width="9" x="5.25" y="9.47656"/>
                <rect fill="none" height="9.25"stroke={iconColor} width="9" x="11" y="3.72656"/>
              </svg>
            }
          </div>
        </div>
      );
  }

    
  }

  export default ElementGroup;