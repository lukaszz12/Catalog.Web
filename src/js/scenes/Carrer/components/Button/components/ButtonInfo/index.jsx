import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import Tooltip from '../../../../../../components/Tooltip';
import TooltipLayout from './TooltipLayout';

const home = () => (
    <i className="fas fa-home"></i>
)

const web = () => (
    <i className="fab fa-internet-explorer"></i>
)

const rowsContent = (data, title) => (
    <React.Fragment>
        {data !== undefined && <ul style={{display: 'flex', flexDirection: 'column'}}>
            {data.rows.map(r => <li key={r.name}><a href={r.link}>{r.name} ({r.count})</a></li>)}
        </ul>}
    </React.Fragment>
)

const createTooltip = (title, contentFunc) => (
    <div>
        <TooltipLayout title={title} content={contentFunc} />
    </div>
) 

class ButtonInfos extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {live} = this.props;
        return(
            <div styleName="button-info">
            {
                this.props.hasValue && 
                <ul>
                    <li><Tooltip eventer={home} content={() => createTooltip('Pokoje/mieszkania', rowsContent(live))}/></li>
                    <li><Tooltip eventer={home} content={() => createTooltip('Pokoje/mieszkania', rowsContent(live))}/></li>
                </ul>
            }
            </div>
        )
    }
}

const ButtonInfosComponent = CSSModules(ButtonInfos, styles); 

export default ButtonInfosComponent;