import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
//
// creamos nuestro propio componente de rutas para asegurar que
// sólo se vean las vistas que tengan que verse cuando el usuario
// está autenticado.
// este componente sirve como 'fachada' para el componente '<Route />'
export const PublicRoute = ({
    isAuthenticated,       // en este parámetro se nos indicará si
                           // el usuario está autenticado o no
                           //
    component: Component,  // en este parámetro se nos indica cuál
                           // componente se desea mostrar en caso
                           // que el usuario esté autenticado
                           //
    ...rest                // en este parámetro quedarán todos los
                           // otros parámetros que se pasen al
                           // componente <Router/> al que servimos
                           // como 'fachada'
}) => {

    return (
        <Route
            { ...rest } // pasa el resto de atributos tal como los recibe
            component={ (props) => ( // si el componente solicitado recibe
                                     // parámetros, estarán en la variable 'props

                (!isAuthenticated) ?          // si el usuario está autenticado
                <Component { ...props } /> :  // retornar el componente solicitado
                                              // con sus parámetros
                <Redirect to="/" /> // sino redireccionar al login

            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}