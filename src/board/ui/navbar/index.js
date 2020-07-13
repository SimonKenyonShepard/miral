import React, {Component} from 'react';

import './styles.css';


class Navbar extends Component {
  
    render() {
        return (
            <div className={"navBar"}>
                <span className={"companyName"}>Your company name</span>
                <span className={"burgerMenu"}></span>
            </div>
        );
    }
    
  }

  export default Navbar;