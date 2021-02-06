import { types } from "../types/types";

const initialState = {
    loading: false,
    error: null
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiSetError:
            return {
                //
                // no necesitamos cambiar el 'state', por tal motivo
                // retornamos el mismo valor que viene
                ...state,
                error: action.payload // texto del error
            }

        case types.uiRemoveError:
            return {
                //
                // no necesitamos cambiar el 'state', por tal motivo
                // retornamos el mismo valor que viene
                ...state,
                error: null // ya no hay error
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true // indicar que se está haciendo una petición
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false // la petición finalizó
            }

        default:
            return state;
    }
}