import { startSaveNote } from "../actions/notes";
import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

/*
    el estado inicial del 'reducer' debe siempre un valor distinto de 'undefined'
*/
export const notesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return {
                ...state,
                //
                // creamos un nuevo arreglo en el cual agregamos la nueva
                // nota al principio y luego las notas existentes, para
                // esto desestructuramos el arreglo haciendo uso de '...'
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [
                    ...action.payload
                ]
            }

        case types.notesUpdated:
            return {
                ...state,
                //
                // con 'map' buscaremos por el 'id' la nota que fue modificada,
                // la quitamos y cambiamos por la nueva información
                notes: state.notes.map(
                    //
                    // es la nota que se modificó?
                    note => note.id === action.payload.id
                    //
                    // entonces devolver la información de la nota modificada,
                    // la cual viene en el 'payload'
                    ? action.payload.note
                    //
                    // si no es la nota que se modificó, entonces retornar
                    // la nota que se está iterando
                    : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                //
                // la 'nota activa' dejó de ser la activa, así que la quitamos
                active: null,
                //
                // quitamos la nota de nuestro arreglo de notas
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        case types.notesLogoutCleaning:
            return {
                //
                // es válido retornar el 'state' al momento del 'logout' del
                // usuario porque puede que se desea mantener cierta info
                // del usuario mientras esté en el sitio
                ...state,
                //
                // retornar el estado initial
                ...initialState
            }

        default:
            return state;
    }
}