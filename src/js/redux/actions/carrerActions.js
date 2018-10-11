import CarrerConstants from 'ReduxConstants/carrerConstants';
import { service } from 'Services/carrerService';
import Api from 'Helpers/api';

export const carrerActions = {
    createTab,
    setNextTab,
    setPreviousTab,
    loadButtonValues,
    backButtonValues,
    openButton,
    init
}

function init(){
    return (dispatch, getState) => {
        debugger;
        Api.get('/carrer/getdefaultdata').then(response => {
            var data = {
                tabIndex: 0,
                buttons: response
            };
            debugger;

            dispatch({type: CarrerConstants.INIT_BUTTONS_VALUES, data});
        });
    }
}

function createTab() {
    return (dispatch, getState) => {
        var tabs = getState().carrer.tabs;
        var activeTabIndex = service.getActiveTabIndex(tabs);
        var newTabId = tabs.length + 1;
        var data = {activeTabIndex, newTabId };

        dispatch({ type: CarrerConstants.CREATE_TAB, data});

        Api.get('/carrer/getdefaultdata').then(response => {
            var data = {
                tabIndex: service.getLastTabIndex(getState().carrer.tabs),
                buttons: response
            };

            dispatch({type: CarrerConstants.INIT_BUTTONS_VALUES, data});
        });
    }
}

function setNextTab() {
    return (dispatch, getState) => {
        var tabs = getState().carrer.tabs;
        var activeTab = service.getActiveTab(tabs);

        var newTabId = activeTab.id + 1;
        var maxTabId = tabs.length;

        if(newTabId > maxTabId){
            return;
        }

        setActiveTabById(dispatch, tabs, newTabId);
    }
}

function setPreviousTab() {
    return (dispatch, getState) => {
        var tabs = getState().carrer.tabs;
        var activeTab = service.getActiveTab(tabs);
        var newTabId = activeTab.id - 1;

        if(newTabId === 0){
            return;
        }

        setActiveTabById(dispatch, tabs, newTabId);
    }
}

function setActiveTabById(dispatch, tabs, id){
    var tabIndex = service.getActiveTabIndex(tabs);
    var newIndexTab = tabs.findIndex(b => b.id === id);
    var data = {tabIndex, newIndexTab};

    dispatch({ type: CarrerConstants.SET_ACTIVE_TAB_BY_ID, data});
}

function openButton(type) {
    return (dispatch, getState) => {
        var tabs = getState().carrer.tabs;
        var tabIndex = service.getActiveTabIndex(tabs);
        var data = {tabIndex, type};

        dispatch({ type: CarrerConstants.OPEN_BUTTON, data });
    }
}

function loadButtonValues(selectedId, level, name, type) {
    return (dispatch, getState) => {
        var tabs = getState().carrer.tabs;
        var tab = service.getActiveTab(tabs);
        var tabIndex = service.getActiveTabIndex(tabs);
        var filters = service.getFilters(tab, type);

        var model = {
            mainFilter: {
                type,
                level: level,
                id: selectedId
            },
            filters
        }

        Api.post('/carrer/loaddata', model).then(response => {
            let data = {
                type,
                tabIndex,
                buttons: response,
                historySelectedValues: {id: selectedId, level, name}
            };

            dispatch({type: CarrerConstants.LOAD_BUTTON_VALUES, data});
        })
    }
}

function backButtonValues(type) {
    return (dispatch, getState) => {
        const tabs = getState().carrer.tabs;
        const tab = service.getActiveTab(tabs);
        const tabIndex = service.getActiveTabIndex(tabs);
        const filters = service.getFilters(tab, type);

        var model = {
            mainFilter: {
                type,
                level: 0,
                id: 0
            },
            filters
        };

        var historySelectedValues = tab[type].historySelectedValues;
        if (historySelectedValues.length > 1){
            var index = historySelectedValues.length - 2;
            model.mainFilter.id = historySelectedValues[index].id;
            model.mainFilter.level = historySelectedValues[index].level;
        }

        Api.post('/carrer/loaddata', model).then(response => {
            let data = {
                type,
                tabIndex,
                buttons: response
            };

            dispatch({type: CarrerConstants.BACK_BUTTONS_VALUES, data});
        })
    }
}