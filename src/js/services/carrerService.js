export const service = {
    getActiveTabIndex,
    getLastTabIndex,
    hasChilds,
    getActiveTab,
    createEmptyTab,
    getDependentButtonTypes,
    getFilters,
    getLastHistorySelectedValue
}

function createEmptyTab(id){
    return {
        id,
        selected: false,
        localizationData: {
            name: 'Lokalizacja',
            isOpen: false,
            historySelectedValues: [],
            values: []
        },
        universityData: {
            name: 'Uczelnia',
            isOpen: false,
            historySelectedValues: [],
            values: []
        },
        subjectData: {
            name: 'Kierunek',
            isOpen: false,
            historySelectedValues: [],
            values: []
        }
    }
}

function getActiveTab(tabs){
    return tabs.filter(t => t.selected === true)[0];
}

function getActiveTabIndex(tabs){
    return tabs.findIndex(b => b.selected === true);
}

function getLastTabIndex(tabs){
    return tabs.length - 1;
}

function hasChilds(map, id, level){
    return map.filter(x => x.parentId == id && x.level == level + 1).length > 0;
}

function getDependentButtonTypes(type){
    var types = ['localizationData', 'universityData', 'subjectData'];
    return types.filter(x => x !== type);
}

function getFilters(tab, mainFilterType){
    var dependentTypes = getDependentButtonTypes(mainFilterType);
    var result = [];
    for(var type of dependentTypes){
        var button = tab[type];
        var history = button.historySelectedValues.slice(-1)[0];

        var model = {
            type,
            id: history !== undefined ? history.id : 0,
            level: history !== undefined ? history.level : 0
        }

        result.push(model);
    }

    return result;
}

function getLastHistorySelectedValue(tab, type){
    return tab[type].historySelectedValues.slice(-1)[0];
}