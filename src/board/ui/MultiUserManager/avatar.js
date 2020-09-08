import React, {Component} from 'react';

import './styles.css';

class Avatar extends Component {
    render() {
        const { color } = this.props.data;

        const wrapperCSS = {
            backgroundColor : color
        };

        return (
            <div className="multiUser_UserDockAvatar" style={wrapperCSS}>
                {this.props.data.name}
            </div>
        );
    }
}

export default Avatar;