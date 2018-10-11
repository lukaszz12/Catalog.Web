import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import { connect } from 'react-redux';
import ChangerTab from './components/ChangerTab';
import CounterTab from './components/CounterTab';
import Button from './components/Button';
import { carrerActions } from  'ReduxActions/carrerActions';


class Carrer extends Component{
    constructor(props){
        super(props);
        this.props.init();
    }

    render(){
        const { 
            onClickSetNextTab,
            onClickSetPreviousTab,
            onClickCreateTab
        } = this.props;

        return(
            <div styleName="carrer">
                <div>
                    <CounterTab />
                </div>
                <div styleName="header-buttons">
                    <a onClick={() => onClickCreateTab()}><i onClick={() => onClickCreateTab()} className="fas fa-plus"></i></a>
                </div>
                <div styleName="tab-container">
                    <ChangerTab type="left" onClick={() => onClickSetPreviousTab()} />
                        <div styleName="buttons">
                            <Button type="localizationData" />
                            <Button type="universityData" />
                            <Button type="subjectData" />
                        </div>
                    <ChangerTab type="right" onClick={() => onClickSetNextTab()} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickCreateTab: () => {
            dispatch(carrerActions.createTab());
        },
        onClickSetPreviousTab: () => {
            dispatch(carrerActions.setPreviousTab());
        },
        onClickSetNextTab: () => {
            dispatch(carrerActions.setNextTab());
        },
        init: () => {
            dispatch(carrerActions.init());
        }
    }
}

const CarrerComponent = CSSModules(Carrer, styles); 

export default connect(null, mapDispatchToProps)(CarrerComponent);



