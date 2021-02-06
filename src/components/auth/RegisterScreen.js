import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from "validator";
import { removeError, setError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithNameEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    //
    // con este 'hook' accedemos al 'state' de 'redux'
    // se le pasa un 'callback' el cual recibe el 'state'
    // y retorna lo que interesa de ese 'state', en este
    // caso sólo deseamos la propiedad 'ui', este valor
    // se puede ver en la pestaña 'redux' de la extensión
    // de Chrome. aprovechamos y desestructuramos para
    // sólo obtener el 'error'.
    // el 'json' que estamos leyendo del 'state' lo podemos
    // ver en el archivo '/actions/ui.js'
    const { error } = useSelector(state => state.ui);

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {

            dispatch(startRegisterWithNameEmailPassword(name, email, password));

        }

        console.log(name, email, password, password2);
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            //
            // se guarda el error en el state de 'redux'
            dispatch(setError('Name is required'));

            return false;
        }
        else if (!validator.isEmail(email)) {
            //
            // se guarda el error en el state de 'redux'
            dispatch(setError('Email is not valid'));

            return false;
        }
        else if (password !== password2 || password.length < 5) {
            //
            // se guarda el error en el state de 'redux'
            dispatch(setError('Password should be at least 6 characters and match each other'));

            return false;
        }

        dispatch(removeError());

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                {   // mostramos de manera condicional el mensaje de error.
                    // sí 'error' es diferente de 'null' y '&&'
                    // la etiqueta '<div>' siempre retorna 'true'
                    error &&
                    (
                        <div className="auth__alert-error">
                            { error }
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button type="submit" className="btn btn-primary btn-block mb-5">Register</button>

                <Link className="link" to="/auth/login">Already registered</Link>
            </form>
        </>
    )
}