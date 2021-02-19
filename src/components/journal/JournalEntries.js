import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    //
    // con este 'hook' accedemos al 'state' de 'redux'
    // se le pasa un 'callback' el cual recibe el 'state'
    // y retorna lo que interesa de ese 'state', en este
    // caso sólo deseamos la propiedad 'ui', este valor
    // se puede ver en la pestaña 'redux' de la extensión
    // de Chrome. aprovechamos y desestructuramos para
    // sólo obtener las notas.
    // el 'json' que estamos leyendo del 'state' lo podemos
    // ver en el archivo '/reducers/notesReducer.js'
    const { notes } = useSelector(state => state.notes);

    return (
        <div className="journal__entries ">

            {
                notes.map(note => (
                    <JournalEntry
                        key={ note.id }
                        { ...note } // todas las propiedades del json 'note'
                                    // se pasan como propiedades al componente
                    />
                ))
            }

        </div>
    )
}