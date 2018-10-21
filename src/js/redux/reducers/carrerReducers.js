import CarrerConstants from 'ReduxConstants/carrerConstants';
import { newContext } from 'immutability-helper';
import { service } from 'Services/carrerService';

const myUpdate = newContext();

export default function carrer(state = { tabs: [init()] }, action = {}){
    switch(action.type){
        case CarrerConstants.CREATE_TAB: 
            return createTab(state, action);
        
        case CarrerConstants.SET_ACTIVE_TAB_BY_ID:
            return setActiveTabById(state, action);

        case CarrerConstants.BACK_VALUES: 
            return backValues(state, action);

        case CarrerConstants.OPEN_BUTTON:
            return openButton(state, action);
        
        case CarrerConstants.INIT_BUTTONS_VALUES:
            return initButtonsValues(state, action);   

        case CarrerConstants.LOAD_BUTTON_VALUES:
            return loadButtonValues(state, action);
        
        case CarrerConstants.BACK_BUTTONS_VALUES:
            return backButtonsValues(state, action);
            
        default: return state;
    }
}

function init(){
    var tab = service.createEmptyTab(1);
    tab.selected = true;

    return tab;
}

function createTab(state, action){
    var tab = service.createEmptyTab(action.data.newTabId);
    return Object.assign(state, state.tabs.push(tab));
}


function setActiveTabById(state, action){
    var {tabIndex, newIndexTab} = action.data;

    return {...state, tabs: myUpdate(state.tabs, {
        [newIndexTab]:{
            selected: {$set: true}
        },
        [tabIndex]: {
            selected: {$set: false}
        }
    })};
}

function openButton(state, action){
    var {tabIndex, type} = action.data;

    var depedentButtonTypes = service.getDependentButtonTypes(type);

    return {...state, tabs: myUpdate(state.tabs, {
        [tabIndex]: { 
            $closeOtherButtons: depedentButtonTypes,
            [type]:{
                isOpen: {$set: !state.tabs[tabIndex][type].isOpen}
            }
        }   
    })};
}

function initButtonsValues(state, action){
    return _updateButtonsValues(state, action.data.tabIndex, action.data.buttons);
}

function loadButtonValues(state, action){
    var { tabIndex, buttons, historySelectedValues, type } = action.data;
    var newState = _updateButtonsValues(state, tabIndex, buttons);

    return {...newState, tabs: myUpdate(newState.tabs, {
        [tabIndex]: {
            [type]: {
                historySelectedValues: {$push: [historySelectedValues]}
            }
        }
    })};
}

function backButtonsValues(state, action){
    var { tabIndex, type, buttons } = action.data;
    var newState = _updateButtonsValues(state, tabIndex, buttons);

    return {...newState, tabs: myUpdate(newState.tabs, {
        [tabIndex]: {
            [type]: {
                historySelectedValues: {$removeLastHistorySelectedValues: {}}
            }
        }
    })}
}

/* privates */

function deepCopy(data){
    return JSON.parse(JSON.stringify(data));
}

function _updateButtonsValues(state, tabIndex, buttons){
    var copy = deepCopy(state);
    return {...copy, tabs: myUpdate(copy.tabs, {
        [tabIndex]: { $updateButtonsValues: buttons}
    })};
}

myUpdate.extend('$closeOtherButtons', function(buttonTypes, tab) {
    var copyTab = deepCopy(tab);
    for(var type of buttonTypes){
        copyTab[type].isOpen = false;
    }

    return copyTab;
});

myUpdate.extend('$updateButtonsValues', function(buttons, tab) {
    tab.localizationData.values = buttons.find(x => x.type === "LocalizationData").values;
    tab.universityData.values =  buttons.find(x => x.type === "UniversityData").values;
    tab.subjectData.values =  buttons.find(x => x.type === "SubjectData").values;

    return tab;
});

myUpdate.extend('$removeLastHistorySelectedValues', function(emptyParam, historySelectedValues) {
   historySelectedValues.splice(-1, 1);
   return historySelectedValues;
});