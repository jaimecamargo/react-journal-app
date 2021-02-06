import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    //
    // creamos un 'estado' para saber si ya se terminó de verificar
    // el estado de autenticación del usuario en el 'useEffect()'
    // que se encuentra unas líneas más abajo, de esta manera podemos
    // mostrar el contenido sólo hasta que 'algo' en particular se
    // cumpla. en este caso NO vamos a mostrar el '<Router/>' hasta
    // que sepamos si el usuario está autenticado o no, ya que así
    // podemos saber haciendo vamos a redirigir al usuario
    const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
    //
    // creamos un 'estado' para saber si el usuario está o no autenticado
    const [userIsLogged, setUserIsLogged] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        //
        // con el siguiente código detectamos cualquier cambio
        // en la autenticación del usuario, si la página se
        // recarga incluso detecta que el usuario está autenticado
        // y lo vuelve a autenticar
        firebase.auth().onAuthStateChanged((user) => {
            //
            // si existe la propiedad 'uid' es porque está autenticado
            if (user?.uid) {
                //
                // activar bandera que indica que el usuario está autenticado
                setUserIsLogged(true);

                dispatch(login(user.uid, user.displayName));

            }
            else {
                //
                // desactivar bandera de usuario no autenticado
                setUserIsLogged(false);
            }
            //
            // ya terminamos de 'chequear' el estado del usuario
            // así que apagamos la bandera
            setCheckingAuthStatus(false);
        });

    }, [dispatch, setUserIsLogged, setCheckingAuthStatus]);
    //
    // si aún se está verificando el estado de autenticación del usuario
    // entonces mostrar el mensaje 'Espere...', de esta manera no se
    // mostrar el contenido del '<Router/>', y esperaremos para mostrarlo
    // hasta que lo sepamos para así saber hacia donde direccionar al
    // usuario
    if (checkingAuthStatus) {
        return (
            //
            // este texto podríamos cambiar por alguna animación
            // agradable a los ojos del usuario
            <h1>Espere...</h1>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        //
                        // pasamos la bandera que determina si el usuario
                        // está autenticado o no
                        isAuthenticated={ userIsLogged }
                    />

                    {/*
                        utilizamos nuestro componente personalizado
                        '<PrivateRoute />' en lugar del '<Route />'
                    */}
                    <PrivateRoute
                        exact
                        path="/"
                        component={ JournalScreen }
                        //
                        // pasamos la bandera que determina si el usuario
                        // está autenticado o no
                        isAuthenticated={ userIsLogged }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}