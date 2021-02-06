import { types } from "../types/types";

/*
    el estado inicial del 'reducer' debe siempre un valor distinto de 'undefined',
    en este caso lo inicializamos con un objeto vacío
*/
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return {}

        default:
            return state;
    }
}