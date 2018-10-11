import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const TooltipLayout = ({title, content}) => (
    <div styleName='button-tooltip-layout'>
        <div styleName='title'>
            <p>{title}</p>
        </div>
        <div styleName="content">
            {content}
        </div>
    </div>
)

export default CSSModules(TooltipLayout, styles);