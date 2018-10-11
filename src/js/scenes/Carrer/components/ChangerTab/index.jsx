import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const ChangerTab = ({type, onClick}) => (
    <a styleName="change-type" onClick={onClick}>
        <i className={'fas fa-angle-' + type}></i>
    </a>
)

export default CSSModules(ChangerTab, styles);