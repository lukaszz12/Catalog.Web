import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

class Tooltip extends Component{
    state = {
        show: false
    }

    constructor(props){
        super(props);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseOver(){
        this.setState({ 
            show: true
        })
    }

    mouseLeave(){
        this.setState({ 
            show: false
        })
    }

    render(){
        var Eventer = this.props.eventer;
        var Content = this.props.content;

        return(
            <div styleName="tooltip" onMouseLeave={this.mouseLeave}>
                <div onMouseOver={this.mouseOver} >
                    <Eventer />
                </div>
                {
                    this.state.show && 
                    <div styleName="tooltip-content">
                        <Content />
                    </div>
                }
            </div>
        )
    }
}

// Tooltip.propTypes = {
//     children: PropTypes.element
// }

export default CSSModules(Tooltip, styles);