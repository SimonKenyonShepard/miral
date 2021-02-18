import React, {Component} from 'react';

import './styles.css';

class Item extends Component {
    render() {
        return (
            <div className={`hub_item`}>
                {this.props.children}
            </div>
        );
    }
}

class TutorialTrigger extends Component {
    render() {
        return (
            <div className={`tutorialTrigger`}>
                <div className={"tutorialTriggerContent"}>
                </div>
            </div>
        );
    }
}

class Home extends Component {
  
    render() {
        return (
            <div className={`hub_section hub_home`}>
                <div className={"hub_scrollWrapper"}>
                    <TutorialTrigger />
                    <h2>Your boards</h2>
                    <div className="hub_boards">
                        <Item>

                        </Item>
                    </div>
                    <h2>Settings</h2>
                </div>
            </div>
        );
    }
    
}

class Templates extends Component {
  
    render() {
        return (
            <div className={`hub_section hub_templates`}>
                <h2>Popular</h2>
                <div className="hub_boards">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
                <h2>Games</h2>
                <div className="hub_boards">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
                <h2>Agile</h2>
                <div className="hub_boards">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
                <h2>Education</h2>
                <div className="hub_boards">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
            </div>
        );
    }
    
}

class Guides extends Component {
  
    render() {
        return (
            <div className={`hub_section hub_guides`}>
                <h2>Basics</h2>
                <h2>Intermediate</h2>
                <h2>Advanced</h2>
            </div>
        );
    }
    
}


class Hub extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            hubVisible : false,
            currentTab : 0,
        };
    }

    hideHub = () => {
        this.setState({hubVisible : false});
    }

    switchTab = (e) => {
        const element = e.target;
        const currentTab = Array.from(element.parentNode.children).indexOf(element);
        this.setState({currentTab});
    }
  
    render() {
        let visibleClass = '';
        const sectionStyles = {};

        const {
            hubVisible,
            currentTab
        } = this.state;

        if(hubVisible) {
            visibleClass = 'hubVisible';
        }

        if(currentTab === 1) {
            sectionStyles.transform = "translateX(-100%)";
        } else if (currentTab === 2) {
            sectionStyles.transform = "translateX(-200%)";
        }

        return (
            <div className={`hub ${visibleClass}`}>
                <div className={`hubBackground`} onPointerUp={this.hideHub}></div>
                <div className={"hubContents"}>
                    <div className={"hubTabs"}>
                        <div className={`hubTab ${(currentTab === 0 ? "selected" : null)}`} onPointerUp={this.switchTab}>Home</div>
                        <div className={`hubTab ${(currentTab === 1 ? "selected" : null)}`} onPointerUp={this.switchTab}>Templates</div>
                        <div className={`hubTab ${(currentTab === 2 ? "selected" : null)}`} onPointerUp={this.switchTab}>Guides</div>
                    </div>
                    <div className={"hubSections"} style={sectionStyles}>
                        <Home />
                        <Templates />
                        <Guides />
                    </div>
                </div>
            </div>
        );
    }
    
  }

  export default Hub;