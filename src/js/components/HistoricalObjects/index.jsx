import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import PropTypes from 'prop-types';

class HistoricalObjects extends Component {
    render() {
        let {objects} = this.props;
        objects = ['asdasdas', 'sdsdsdasdds', 'asdasdasd'];
        return (
            <div styleName="historical-objects">
                {objects !== undefined && <ul>{objects.map(o => <li key={o}>{o}</li>)}</ul>}
            </div>
        )
    }
}

HistoricalObjects.propTypes = {
    objects: PropTypes.arrayOf(PropTypes.string)
}

export default CSSModules(HistoricalObjects, styles);