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
                    <h2 className={"tutorialTriggerHeading tutorialTriggerHeading_main"}>First time?</h2>
                    <h3 className={"tutorialTriggerHeading tutorialTriggerHeading_subLine"}>Explore the sandbox...</h3>
                    <div className={"tutorialTriggerCta"}>{">"}</div>
                </div>
            </div>
        );
    }
}

class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            savedBoards : this.getSavedBoards()
        };
    }

    getSavedBoards = () => {
        const files = [];
        Object.keys(window.localStorage).forEach(item => {
            if(item.indexOf("miralFile_") !== -1) {
                const fileName = item.replace("miralFile_", "");
                const file = window.localStorage.getItem(item);
                const dataToLoad = JSON.parse(file);
                files.push(
                    <Item
                        key={`fileOption_${fileName}`} 
                        fileName={fileName}
                    >
                        <div className={"itemCtaImage"}><img alt="file preview" src={dataToLoad.previewImage} /></div>
                        <div className={"itemCtaIconText"}>{fileName}</div>
                    </Item>
                );
            }
        });
        if(files.length === 0) {
            files.push(<div className="navMenu_error">
                No saved files found on this browser.
            </div>);
        }
        return files;
    }
  
    render() {
        const {
            savedBoards
        } = this.state;
        return (
            <div className={`hub_section hub_home`}>
                <div className={"hub_subMenu"}>
                    <div className={"hub_subMenu_item"}>Your boards</div>
                    <div className={"hub_subMenu_item"}>Groups</div>
                    <div className={"hub_subMenu_item"}>Settings</div>
                </div>
                <div className={"hub_scrollWrapper"}>
                    <TutorialTrigger />
                    <h2 className="hub_title">Your boards</h2>
                    <div className="hub_boards">
                        <Item>
                            <div className={"itemCtaLogo"}>{"+"}</div>
                            <div className={"itemCtaText"}>new board</div>
                        </Item>
                        {savedBoards}
                    </div>
                    <h2 className="hub_title">Groups</h2>
                    <div className="hub_boards">
                        <Item>
                            <div className={"itemCtaLogo"}>{"+"}</div>
                            <div className={"itemCtaText"}>new group</div>
                        </Item>
                    </div>
                    <h2 className="hub_title">Settings</h2>
                    <div className="hub_boards">
                    </div>
                </div>
            </div>
        );
    }

    // componentDidUpdate() {
    //     this.getSavedBoards();
    // }
    
}

class Templates extends Component {
  
    render() {
        return (
            <div className={`hub_section hub_templates`}>
                <div className={"hub_subMenu"}>
                    <div className={"hub_subMenu_item"}>Popular</div>
                    <div className={"hub_subMenu_item"}>Games</div>
                    <div className={"hub_subMenu_item"}>Agile</div>
                    <div className={"hub_subMenu_item"}>Education</div>
                </div>
                <div className={"hub_scrollWrapper"}>
                <h2 className="hub_title">Popular</h2>
                <div className="hub_boards">
                    <Item>
                        <div className={"itemCtaImage"}></div>
                        <div className={"itemCtaIconText"}>1-day design sprint</div>
                    </Item>
                    <Item>
                        <div className={"itemCtaIcon"}>{"🔧"}</div>
                        <div className={"itemCtaIconText"}>Worlds simplest retro</div>
                    </Item>
                    <Item>
                        <div className={"itemCtaIcon"}>{"⚖"}</div>
                        <div className={"itemCtaIconText"}>Lightening descision Jam</div>
                    </Item>
                    <Item>
                        <div className={"itemCtaIcon"}>{"🏆"}</div>
                        <div className={"itemCtaIconText"}>Team trust building</div>
                    </Item>
                    <Item>
                        <div className={"itemCtaIcon"}>{"📜"}</div>
                        <div className={"itemCtaIconText"}>Team charter</div>
                    </Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
                <h2 className="hub_title">Games</h2>
                <div className="hub_boards">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
                <h2 className="hub_title">Agile</h2>
                <div className="hub_boards">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
                <h2 className="hub_title">Education</h2>
                <div className="hub_boards">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </div>
                </div>
            </div>
        );
    }
    
}

class Guides extends Component {
  
    render() {
        return (
            <div className={`hub_section hub_guides`}>
                <div className={"hub_subMenu"}>
                    <div className={"hub_subMenu_item"}>Basics</div>
                    <div className={"hub_subMenu_item"}>Intermediate</div>
                    <div className={"hub_subMenu_item"}>Advanced</div>
                    <div className={"hub_subMenu_item"}>Release notes</div>
                </div>
                <div className={"hub_scrollWrapper"}>
                    <h2 className="hub_title">Basics</h2>
                    <h2 className="hub_title">Intermediate</h2>
                    <h2 className="hub_title">Advanced</h2>
                    <h2 className="hub_title">Release notes</h2>
                </div>
            </div>
        );
    }
    
}


class Hub extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            hubVisible : true,
            currentTab : 0,
        };
    }

    hideHub = () => {
        this.setState({hubVisible : false});
    }

    switchTab = (e) => {
        const element = e.target;
        const currentTab = Array.from(element.parentNode.children).indexOf(element)-1;
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
                        <div className={"hubTabLogo"} >Workshoppr</div>
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