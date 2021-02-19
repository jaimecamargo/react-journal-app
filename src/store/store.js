import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { notesReducer } from "../reducers/notesReducer";
import thunk from "redux-thunk";

const composeEnhacers = (
                         typeof window !== 'undefined' &&
                         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                        ) || compose;

const reducers = combineReducers({
    auth: authReducer,  // al poner los 'reducers' aquí en el 'store' hacemos que
    ui: uiReducer,      // los 'states' aparezcan en la pestaña 'Redux' de la
                        // extensión de Google Chrome
    notes: notesReducer
});

export const store = createStore(
    reducers,
    //
    // el siguiente es el middleware para habilitar
    // la extensión de 'Redux' en Google Chrome.
    // se pone en comentarios porque la línea
    // 'composeEnhacers(applyMiddleware(thunk))'
    // ya incluye esta extension
    //
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    //
    //
    composeEnhacers(applyMiddleware(thunk))
);