import React, {Component} from 'react';

import './styles.css';

const rfc6902 = require('rfc6902');

class Avatar extends Component {
    render() {
        return (
            <div className="multiUser_UserDockAvatar">
                {this.props.data.name}
            </div>
        );
    }
}

class MultiUserManager extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
          isParticipant : false,
          boardError : null,
          socket : null,
          boardUsers : {},
          companyName : "unfoldbio",
          boardID : "2eweor3892",
          password : "miral"
      };
    }

    setupShareBoardSocketConnection = () => {
        const {
            companyName,
            boardID,
            password
        } = this.state;

        const owner = {
            id : "234234234",
            name : "simon",
            initials : "ss"
        };
       
        const io = window.io;
        const boardContents = {
            elements : this.props.elements,
            elementState : this.props.elementState
        };
        const socket = io(`http://localhost:3001/${companyName}`);
        socket.emit("shareBoard", {
            boardID,
            boardContents,
            owner,
            password,
            duration : 40
        });
        // const mouseData = {

        // };
        // socket.emit("mouseUpdate", mouseData);

        socket.on('userJoin', (userData) => {
            const newBoardUsers = {...this.state.boardUsers};
            newBoardUsers[userData.id] = userData;
            this.setState({
                boardUsers : newBoardUsers
            });
        });
        socket.on('updateBoard', (data) => {
            const newCombinedData = {
                elements : {...this.props.elements},
                elementState : {...this.props.elementState},
                multiUserUpdate : true 
            };
            rfc6902.applyPatch(newCombinedData, data.elementsDiffUpdates);
            this.props.handleUpdateElementsAndState(newCombinedData);
        });
        // socket.on('mouseUpdate', (name) => {
        //     console.log(name);
        // });
        // socket.on('boardUpdate', (name) => {
        //     console.log(name);
        // });
        // socket.on('shareEnded', (name) => {
        //     console.log(name);
        // });

        this.setState({
            socket
        });
    }

    setupJoinBoardSocketConnection = () => {
       const {
            companyName,
            boardID,
            password
        } = this.state;

        const user = {
            id : "398234k3423lk4",
            name : "simonJoin",
            initials : "sks"
        };

        const io = window.io;
        const socket = io(`http://localhost:3001/${companyName}`);
        socket.emit("joinBoard", {
            boardID,
            user,
            password
        });
        socket.on('initializeBoard', (boardData) => {
            this.props.handleUpdateElementsAndState(boardData.boardContents);
            this.setState({
               boardUsers : boardData.users 
            });
        })
        socket.on('userJoin', (userData) => {
            const newBoardUsers = {...this.state.boardUsers};
            newBoardUsers[userData.id] = userData;
            this.setState({
                boardUsers : newBoardUsers
            });
        });
        // socket.on('mouseUpdate', (name) => {
        //     console.log(name);
        // });
        socket.on('updateBoard', (data) => {
            const newCombinedData = {
                elements : {...this.props.elements},
                elementState : {...this.props.elementState},
                multiUserUpdate : true  
            };
            rfc6902.applyPatch(newCombinedData, data.elementsDiffUpdates);
            this.props.handleUpdateElementsAndState(newCombinedData);
        });
        socket.on('shareEnded', (data) => {
            this.setState({
                boardError : data.reason
            });
        });
        this.setState({
            socket,
            isParticipant : true
        });
    }

    render() {

        const {
            boardUsers,
            isParticipant,
            boardError
        } = this.state;

        let userDockItems = [];

        const containerStyles = {
            pointerEvents: "none",
            position: "absolute",
            left : 0,
            top: 0,
            height: "100vh",
            width : "100vw"
        };

        if(isParticipant) {
            if(Object.keys(boardUsers).length > 0) {
                userDockItems = Object.keys(boardUsers).map(boardUser => {
                    return (<Avatar key={boardUsers[boardUser].id} data={boardUsers[boardUser]}/>);
                })
            }
            if(boardError) {
                containerStyles.pointerEvents = "auto";
            }
        }

        
        
        return (
            <div
                id="mutliUserManager"
                style={containerStyles}
            >
            {((Object.keys(boardUsers).length > 0) && 
                <div className={"multiUser_UserDock"}>
                    {userDockItems}
                </div>
            )}
            {(boardError && 
                <div className={"multiUser_boardError"}>
                    <span className={"multiUser_boardErrorText"}>Board unavailable : {boardError}</span>
                </div>
            )}
            </div>
            
        );
    }

    componentDidUpdate(prevProps) {
        const {
            boardID,
            socket,
            isParticipant
        } = this.state;
        
        if(prevProps.shareBoard !== this.props.shareBoard) {
            if(this.props.shareBoard && !socket) {
                console.log("setup board sharing");
                this.setupShareBoardSocketConnection();
                //emit shareBoard event
                //emit mouseData event
            } else {
                //emit unShareBoard event
            }
        }
        if((this.props.shareBoard || isParticipant) && socket && !this.props.multiUserUpdate) {
            const prevCombinedData = {
                elements : prevProps.elements,
                elementState : prevProps.elementState 
            };
            const currentCombinedData = {
                elements : this.props.elements,
                elementState : this.props.elementState 
            };
            const elementsDiffUpdates = rfc6902.createPatch(prevCombinedData, currentCombinedData);
            console.log("emit board update", elementsDiffUpdates);
            if(elementsDiffUpdates.length > 0) {
                socket.emit("updateBoard", {boardID, elementsDiffUpdates});
            }
        } else if (this.props.multiUserUpdate) {
            this.props.handleUpdateElementsAndState({multiUserUpdate : false});
        }
       
        //Evaluate state
        //if elementState or elementData is not the same the emit updateBoard
        //Evaluate mouseData
    }

    componentDidMount(){
        //check if is joining a remote board
        if(window.location.hash.indexOf("join") !== -1) {
            this.setupJoinBoardSocketConnection();
        }
    }

    componentWillUnmount(){
        
    }
    
  }

  export default MultiUserManager;