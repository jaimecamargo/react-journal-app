import React from 'react'
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {
    //
    // con este 'hook' accedemos al 'state' de 'redux'
    // se le pasa un 'callback' el cual recibe el 'state'
    // y retorna lo que interesa de ese 'state', en este
    // caso sólo deseamos la propiedad 'ui', este valor
    // se puede ver en la pestaña 'redux' de la extensión
    // de Chrome. aprovechamos y desestructuramos para
    // sólo obtener la propiedad 'active'.
    // el 'json' que estamos leyendo del 'state' lo podemos
    // ver en el archivo '/reducers/notesReducer.js'
    const { active } = useSelector(state => state.notes);

    return (
        <div className="journal__main-content animate__animated animate__fadeIn">
            <Sidebar />

            <main>
                {
                    (active)
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }
            </main>
        </div>
    )
}