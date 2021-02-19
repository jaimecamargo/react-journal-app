import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {

    const dispatch = useDispatch();
    //
    // con este 'hook' accedemos al 'state' de 'redux'
    // se le pasa un 'callback' el cual recibe el 'state'
    // y retorna lo que interesa de ese 'state', en este
    // caso sólo deseamos la propiedad 'auth', este valor
    // se puede ver en la pestaña 'redux' de la extensión
    // de Chrome. aprovechamos y desestructuramos para
    // sólo obtener el 'name'.
    // el 'json' que estamos leyendo del 'state' lo podemos
    // ver en el archivo '/reducers/authReducer.js'
    const { name: userName } = useSelector(state => state.auth);

    const handleLogout = () => {

        dispatch(startLogout());

    }

    const handleNewEntry = () => {

        dispatch(startNewNote());

    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> { userName }</span>
                </h3>

                <button onClick={ handleLogout } className="btn">Logout</button>
            </div>

            <div
                className="journal__new-entry"
                onClick={ handleNewEntry }>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">new entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
};