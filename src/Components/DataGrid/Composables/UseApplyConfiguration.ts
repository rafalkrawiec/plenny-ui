import { defaultConditionGroup } from '../Services/Filter/ApplyFilter';
import { toValue } from 'vue';
export function useApplyConfiguration(name, { database, columns, visible, filter, sizing, sort, search }) {

    function applyConfiguration() {

        database.get(name).then(result => {
            if (result) {
                let data = JSON.parse(result.data)

                fillConfiguration({ data, columns, visible, filter, sizing, sort, search })
            }
        })
    }

    return { applyConfiguration };
}


export function validation(fromDatabase, fromGrid) {

    let validated = Object.fromEntries(Object.entries(fromGrid).map(([key, value]) => {
        if (fromDatabase && fromDatabase[key] != null) {
            return [key, fromDatabase[key]];
        } else {
            return [key, value];
        }
    }))

    return validated
}


export function fillConfiguration({ data, columns, visible, filter, sizing, sort, search }) {

    visible.value = validation(data.visible, defaultVisibleConfiguration(columns))
    filter.value = defaultConditionGroup()
    sizing.value = validation(data.sizing, defaultSizingConfiguration(columns))
    sort.value = validation(data.sort, defaultSortConfiguration())
    search.value = data.search

}

export function defaultSizingConfiguration(columns) {
    return Object.fromEntries(toValue(columns).map((col) => {
        return [col.key, col.width != null ? col.width : 200];
    }))
}

export function defaultVisibleConfiguration(columns) {
    return Object.fromEntries(toValue(columns).map((col) => {
        return [col.key, col.visible != null ? col.visible : true];
    }))
}

export function defaultSortConfiguration() {
    return {}
}

export function resetConfiguration({ columns, visible, filter, sizing, sort, search }) {
    sizing.value = defaultSizingConfiguration(columns)
    visible.value = defaultVisibleConfiguration(columns)
    sort.value = defaultSortConfiguration()
    filter.value = defaultConditionGroup()
    search.value = ""
}

