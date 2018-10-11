import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom';
  
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

class Nav extends Component{
    render(){
        return(
                <div styleName="navigation"> 
                    <ul>
                        <li><Link to="/">Strona główna</Link></li>
                        <li><Link to="/kariera">Kariera</Link></li>
                    </ul>
                </div>
        )
    }
}

export default CSSModules(Nav, styles);