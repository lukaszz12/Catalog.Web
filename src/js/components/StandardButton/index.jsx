import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const StandardButton = ({label, onClick}) => (
    <button styleName="Button" onClick={() => onClick()}>{label}</button>
)

export default CSSModules(StandardButton, styles);