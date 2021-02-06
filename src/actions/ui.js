import { types } from "../types/types"

export const setError = (err) => {
    return {
        // obligatorio que el nombre del campo se llame 'type'
        type: types.uiSetError,
        payload: err
    }
}

export const removeError = () => {
    return {
        // obligatorio que el nombre del campo se llame 'type'
        type: types.uiRemoveError,
        //payload: null
    }
}

export const startLoading = () => {
    return {
        // obligatorio que el nombre del campo se llame 'type'
        type: types.uiStartLoading
    }
}

export const finishLoading = () => {
    return {
        // obligatorio que el nombre del campo se llame 'type'
        type: types.uiFinishLoading
    }
}