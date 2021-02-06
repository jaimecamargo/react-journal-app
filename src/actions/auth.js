import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";

// cuando las 'acciones' que se van a realizar son asíncronas, es decir
// se solicita su ejecución pero no se sabe cuándo éstas terminan,
// debemos hacer que las 'acciones' retornen un 'callback' o también
// llamadas función de retorno, por esto veremos retornos como:
//
// 'return (dispatch) => { /* código de la función */ }'
//
// estos casos los veremos normalmente cuando llamemos librerías
// de terceros que retornen promesas

export const startLoginEmailPassword = (email, password) => {
    //
    // retorna un 'callback' (es decir, una función asíncrona)
    // 'thunk' es quien inyecta el 'dispatch'
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(login(user.uid, user.displayName));

            })
            //
            // se puede intentar crear una cuenta de un usuario existente
            // por lo tanto debemos controlar esta excepción
            .catch(e => {

                Swal.fire('Error', e.message, 'error');

            })
            .finally(() => {

                dispatch(finishLoading());

            });
    }
}

export const startRegisterWithNameEmailPassword = (name, email, password) => {
    //
    // retorna un 'callback' (es decir, una función asíncrona)
    // 'thunk' es quien inyecta el 'dispatch'
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            //
            // desestructuramos el 'json' que retorna Google
            // para recuperar sólo el 'objeto' 'user'
            .then(async ({ user }) => {
                //
                // cuando en firebase se crea un usuario que no 'enlazado'
                // a un proveedor de autenticación que utilice 'oAuth'
                // hay que actualizar el nombre del usuario manualmente.
                // dado que 'updateProfile' retorna una promesa y necesitamos
                // esperar por esa respuesta para poder continuar, ponemos
                // 'async' dentro del 'then'. de esta manera podemos poner
                // el 'await' en el llamado a 'updateProfile'
                await user.updateProfile({ displayName: name });
                //
                // el dispatch es utilizado cuando ya tenemos
                // respuesta por parte de firebase, en este caso
                // como es una promesa utilizamos 'then' para
                // saber que todo salió bien
                dispatch(login(user.uid, user.displayName));
            })
            //
            // se puede intentar crear una cuenta de un usuario existente
            // por lo tanto debemos controlar esta excepción
            .catch(e => {

                Swal.fire('Error', e.message, 'error');

            });
    }
}

export const startGoogleLogin = () => {
    //
    // retorna un 'callback' (es decir, una función asíncrona)
    // 'thunk' es quien inyecta el 'dispatch'
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            //
            // desestructuramos el 'json' que retorna Google
            // para recuperar sólo el 'objeto' 'user'
            .then(({ user }) => {
                //
                // el dispatch es utilizado cuando ya tenemos
                // respuesta por parte de firebase, en este caso
                // como es una promesa utilizamos 'then' para
                // saber que todo salió bien
                dispatch(login(user.uid, user.displayName));
            });
    }
}

export const login = (uid, displayName) => {
    return {
        // obligatorio que el nombre del campo se llame 'type'
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {

        await firebase.auth().signOut();

        dispatch(logout());
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}