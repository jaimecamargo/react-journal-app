import { findByDisplayValue } from '@testing-library/react';
import Swal from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// cuando las 'acciones' que se van a realizar son asíncronas, es decir
// se solicita su ejecución pero no se sabe cuándo éstas terminan,
// debemos hacer que las 'acciones' retornen un 'callback' o también
// llamadas función de retorno, por esto veremos retornos como:
//
// 'return (dispatch) => { /* código de la función */ }'
//
// estos casos los veremos normalmente cuando llamemos librerías
// de terceros que retornen promesas

export const startNewNote = () => {
    //
    // retorna un 'callback' (es decir, una función asíncrona)
    // 'thunk' es quien inyecta el 'dispatch'.
    // en el segundo parámetro recibimos una función para acceder al 'state'
    return async (dispatch, getState) => {
        //
        // con 'getState()' recuperamos el 'state', y de ahí
        // sacaremos el 'uid' del usuario autenticado.
        // esta información está en el 'state' de Redux, la entrada
        // se puede ver en el archivo '/store/store.js', y el json se
        // puede encontrar en '/reducers/authReducer.js'
        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        //
        // el 'uid' del usuario lo vamos a utilizar como 'nombre de colección'
        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
        //
        dispatch(activeNote(docRef.id, newNote));
        //
        // disparar la actualización del 'store' de Redux para hacer que
        // se actualice el panel de derecho con el listado de las notas
        dispatch(addNewNote(docRef.id, newNote));
    }
}

export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,
        payload: {
            id,
            ...note
        }
    }
}

export const activeNote = (id, note) => {
    return {
        // obligatorio que el nombre del campo se llame 'type'
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
};

export const startSaveNote = (note) => {
    //
    // retorna un 'callback' (es decir, una función asíncrona)
    // 'thunk' es quien inyecta el 'dispatch'.
    // en el segundo parámetro recibimos una función para acceder al 'state'
    return async (dispatch, getState) => {
        //
        // con 'getState()' recuperamos el 'state', y de ahí
        // sacaremos el 'uid' del usuario autenticado.
        // esta información está en el 'state' de Redux, la entrada
        // se puede ver en el archivo '/store/store.js', y el json se
        // puede encontrar en '/reducers/authReducer.js'
        const uid = getState().auth.uid;
        //
        // Firestore no permite propiedades con valor 'undefined'
        if (!note.url) {
            delete note.url;
        }
        //
        // clonamos el json del 'note'
        const noteToFirestore = { ...note };
        //
        // remover la propiedad 'id' porque Firestore es quien lo genera
        delete noteToFirestore.id;
        //
        // guardar en Firestore
        await db.doc(`${uid}/journal/notes/${note.id}`)
                .update(noteToFirestore);
        //
        // generar la actualización de la información de la nota activa
        // en el panel derecho
        dispatch(refreshActiveNote(note.id, note));
        //
        // mostrar mensaje de éxito
        Swal.fire('saved', note.title, 'success');
    }
};

export const refreshActiveNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note
        }
    }
};

export const startUploadFile = (file) => {
    //
    // retorna un 'callback' (es decir, una función asíncrona)
    // 'thunk' es quien inyecta el 'dispatch'.
    // en el segundo parámetro recibimos una función para acceder al 'state'
    return async (dispatch, getState) => {
        //
        // un mensaje animado
        Swal.fire({
            title: 'Uploading image',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const { active: currentNote } = getState().notes;

        const fileUrl = await fileUpload(file);
        //
        // actualizar la 'url' de la nota actual
        currentNote.url = fileUrl;
        //
        // actualizar la nota en la base de datos de Firebase
        dispatch(startSaveNote(currentNote));
        //
        // cerrar mensaje animado
        Swal.close();
    }
}

export const startDeleting = (id) => {
    //
    // retorna un 'callback' (es decir, una función asíncrona)
    // 'thunk' es quien inyecta el 'dispatch'.
    // en el segundo parámetro recibimos una función para acceder al 'state'
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        //
        // eliminar la nota en la base de datos de Firebase
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        //
        // actualizar el store de Redux para que los componentes interesados
        // reflejen los cambios
        dispatch(deleteNote());
    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const noteLogout = () => {
    return {
        type: types.notesLogoutCleaning,
        payload: null
    }
}