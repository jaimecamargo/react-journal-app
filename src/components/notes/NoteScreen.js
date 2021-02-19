import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    //
    // con este 'hook' accedemos al 'state' de 'redux'
    // se le pasa un 'callback' el cual recibe el 'state'
    // y retorna lo que interesa de ese 'state', en este
    // caso sólo deseamos la propiedad 'notes', este valor
    // se puede ver en la pestaña 'redux' de la extensión
    // de Chrome. aprovechamos y desestructuramos para
    // sólo obtener la nota activa, es decir, la propiedad
    // 'active'.
    // el 'json' que estamos leyendo del 'state' lo podemos
    // ver en el archivo '/reducers/authReducer.js'
    const { active: currentNote } = useSelector(state => state.notes);

    const [ formValues, handleInputChange, reset ] = useForm(currentNote);

    const { id, title, body, url } = formValues;

    const activeId = useRef(currentNote.id);

    useEffect(() => {

        if (currentNote.id !== activeId.current) {
            reset(currentNote);
            activeId.current = currentNote.id;
        }

    }, [currentNote, reset]);

    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }));

    }, [formValues, dispatch]);

    const handleDelete = () => {

        dispatch(startDeleting(id));

    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (url)
                    &&
                    (
                        <div className="notes__image">
                            <img
                                alt="Image"
                                src={ url }
                            />
                            </div>
                    )
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }>
                Delete
            </button>
        </div>
    )
}