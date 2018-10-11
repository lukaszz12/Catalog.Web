import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import { connect } from 'react-redux';

class CounterTab extends Component{
    render(){
        const {tabs} = this.props;

        return(
            <div>
                <ul styleName="counter-tab">
                    {tabs !== undefined && tabs.map(m => (
                        <li key={m.id}><div styleName={m.selected ? 'selected' : ''}></div></li>
                    ))}
                </ul>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        tabs: state.carrer.tabs
    }
}

const CarrerComponent = CSSModules(CounterTab, styles); 

export default connect(mapStateToProps)(CarrerComponent);