import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadFile } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const { active: currentNote } = useSelector(state => state.notes);

    const handleSaveClick = () => {

        dispatch(startSaveNote(currentNote));

    }

    const handleLoadPictureClick = () => {

        document.querySelector('#fileSelector').click();

    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            dispatch(startUploadFile(file));
        }

    }

    return (
        <div className="notes__appbar">
            <span>07 de enero 2021</span>

            {/*
                un '<input />' tipo 'file' oculto, que utilizaremos para
                que el usuario seleccione la imagen que desea subir
            */}
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    onClick={ handleLoadPictureClick }
                    className="btn">
                    Picture
                </button>
                <button
                    onClick={ handleSaveClick }
                    className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}