import React, {PureComponent} from 'react';
import VisibilityOverlay from '../shared/visibilityOverlay';
import WrappedText from '../shared/wrappedText';

import './styles.css';

class ElementText extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleTextEdit = () => {
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        let overlay = null;
        if(this.props.isSelected(data.id)) {
            shapeProps.style = {outline : `${(data.initialZoomLevel)}px dashed #5086F2`};
        } else if(elementState.selected) {
            shapeProps.style = {outline : `${(data.initialZoomLevel)}px solid #666`};
            overlay = (<rect 
                {...shapeProps}
                fillOpacity={"0.3"}
                fill="#000000"
            />);
        }
        if(data.text) {
            text = (
            <WrappedText
                shapeProps={shapeProps}
                fontStyle={data.fontStyle}
                text={data.text}
                padding={data.padding}
            />
            )
        }
        
        return (
            <g 
                onDoubleClick={this.handleTextEdit}
                cursor={this.state.cursor}
                height={shapeProps.height}
                width={shapeProps.width}
            >
                <rect 
                    id={data.id}
                    {...shapeProps}
                />
                {text}
                {overlay}
                {data.hidden && (
                    <VisibilityOverlay 
                        shapeProps={shapeProps}
                    />
                )}
            </g>
        );
    }

    componentDidMount() {
        if(this.props.isUniqueSelected(this.props.data.id)) {
            setTimeout(() => {
                    this.handleTextEdit();
            }, 300);
        }
    }
    
  }

  export default ElementText;