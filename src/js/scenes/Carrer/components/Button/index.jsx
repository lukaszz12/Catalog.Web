import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import { connect } from 'react-redux';
import ObjectList from './components/ObjectList';
import { carrerActions } from  'ReduxActions/carrerActions';

class Button extends Component{
    getButtonName(button){
        var lastSelectedValue = button.historySelectedValues.slice(-1)[0];
        return lastSelectedValue !== undefined ? lastSelectedValue.name : button.name;
    }

    render(){
        var {button, type} = this.props;
        var name = this.getButtonName(button);

        return(
            <div styleName="container">
                <div>
                    <div styleName="button">
                        <button onClick={this.props.openButton}>{name}</button>
                        {/* <ButtonInfos live={live} hasValue={button.historySelectedValues.length > 0} /> */}
                    </div>
                </div>
                <div styleName="container-objects">
                    <ObjectList type={type} values={button.values} isOpen={button.isOpen} canShowBackButton={button.historySelectedValues.length > 0} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        button: state.carrer.tabs.find(x => x.selected)[ownProps.type]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openButton: () => {
            dispatch(carrerActions.openButton(ownProps.type));
        }
    }
}

const ButtonComponent = CSSModules(Button, styles); 

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);