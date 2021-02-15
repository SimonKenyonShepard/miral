import React, {PureComponent} from 'react';
import VisibilityOverlay from '../shared/visibilityOverlay';

import './styles.css';

class Dice extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {
          diceAnimation : null
      };
    }

    generateRandomDiceNumber() {
        return Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    }

    handleDiceClick = (e) => {
        e.stopPropagation();
        this.props.handleUpdateElementProperty({
            id : [this.props.data.id],
            update : {
                diceNumber : this.generateRandomDiceNumber()
            }
        });
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let shape = null;
        let overlay = null;
        let dice = null;
        if(this.props.isSelected(data.id)) {
            shapeProps.style = {outlineWidth : `${(data.initialZoomLevel)}px`};
            shapeProps.className = "elementSelectedByUser";
        } else if(elementState.selected) {
            shapeProps.style = {outlineWidth : `${(data.initialZoomLevel)}px`};
            shapeProps.className = "elementSelectedByOtherUser";
            overlay = (<rect 
                {...shapeProps}
                fillOpacity={"0.3"}
                fill="#000000"
            />);
        }

        const strokeWidth = 15*data.initialZoomLevel;

        shapeProps.fill = "url(#diagonalHatch)";
        shapeProps.fillOpacity = "1";
        shapeProps.stroke = "#ccc";
        shapeProps.strokeOpacity = "0.3";
        shapeProps.strokeWidth = strokeWidth;
        
        shape = <rect
            id={data.id} 
            {...shapeProps}
        />;

        const diceFaces = [
            [[20,20]],
            [[10,30], [30,10]],
            [[10,30], [20,20], [30,10]],
            [[10,10], [10,30], [30,10], [30, 30]],
            [[10,10], [10,30], [20, 20], [30,10], [30, 30]],
            [[10,10], [10,20], [10, 30], [30,10], [30, 20], [30, 30]]
        ];

        const diceNumberToUse = this.state.diceAnimation || data.diceNumber;

        dice = (
            <g
            transform={`translate(${shapeProps.x} ${shapeProps.y}) scale(${(shapeProps.width/40)})`}
            >
                <rect
                    x={"0"}
                    y={"0"}
                    width={"40"}
                    height={"40"}
                    cursor={"pointer"}
                    fill={"#333"}
                    onClick={this.handleDiceClick}
                />
                {
                    diceFaces[diceNumberToUse].map(diceCoords => {
                        return <circle
                            key={`diceFace_${diceCoords[0]}_${diceCoords[1]}`} 
                            r={4}
                            cx={diceCoords[0]}
                            cy={diceCoords[1]}
                            fill={"#fff"}
                        />;
                    })
                }

            </g>
        );

        return (
            <g 
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {shape}
                {dice}
                {overlay}
                {data.hidden && (
                    <VisibilityOverlay 
                        shapeProps={shapeProps}
                    />
                )}
            </g>
        );
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.data.diceNumber !== this.props.data.diceNumber);
        if(prevProps.data.diceNumber !== this.props.data.diceNumber) {
            const intervalMax = 6;
            let intervalCount = 0;
            const interval = setInterval(() => {
                if(intervalCount > intervalMax) {
                    this.setState({diceAnimation : null});
                    clearInterval(interval);
                } else {
                    this.setState({diceAnimation : this.generateRandomDiceNumber()})
                }
                intervalCount++; 
            }, 200);
        }
    }
    
  }

  export default Dice;