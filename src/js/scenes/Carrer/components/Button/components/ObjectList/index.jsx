import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import { connect } from 'react-redux';
import { carrerActions } from  'ReduxActions/carrerActions';
import { Input } from 'reactstrap';

const Objects = ({objects, onClick}) => (
    <ul style={{margin: 0}}>
        {objects.map(o => <li key={o.id} onClick={() => onClick(o)}>{o.name}</li>)}
    </ul>
)

class ObjectList extends Component{
    constructor(props){
        super(props);
        this.getFilteredValues = this.getFilteredValues.bind(this);
        this.state = {
            values: this.props.values,
            filterdValues: this.props.values
        };
    }

    static getDerivedStateFromProps(props, state) {
        if(props.values != state.values){
            return {
                values: props.values,
                filterdValues: props.values
            }
        }

        return state;
    }

    getFilteredValues(input){
        var filterValue = input.currentTarget.value.toLowerCase();
        var filterdValues = this.props.values.filter(x => x.name.toLowerCase().includes(filterValue));
        this.setState({
            filterdValues: filterdValues
        })
    }

    render(){
        const { isOpen, canShowBackButton, values } = this.props;

        return(
            <div styleName="object-list">
                {canShowBackButton && isOpen && <a styleName="back" onClick={() => this.props.onClickBackButtonValues()}><i className='fas fa-arrow-circle-left'></i></a> }
                {
                    isOpen && values.length > 0 &&
                    <Input type="text" onChange={(v) => this.getFilteredValues(v)} />
                }
                {
                    isOpen && 
                    <Objects objects={this.state.filterdValues} onClick={(v) => this.props.onClickLoadValuesByParentId(v.id, v.level, v.name)} />
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClickLoadValuesByParentId: (parentId, level, name) => {
            dispatch(carrerActions.loadButtonValues(parentId, level, name, ownProps.type));
        },
        onClickBackButtonValues: () => {
            dispatch(carrerActions.backButtonValues(ownProps.type));
        }
    }
}

const ObjectListComponent = CSSModules(ObjectList, styles); 

export default connect(null, mapDispatchToProps)(ObjectListComponent);