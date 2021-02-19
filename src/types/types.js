/*
    se pone dentro de corchetes cuadrados el nombre del reducer
    al que pertenece el acción que se está ejecutando
*/
export const types = {
    login: '[Auth] login',
    logout: '[Auth] logout',

    uiSetError: '[UI] Set error',
    uiRemoveError: '[UI] Remove error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    notesAddNew: '[Notes] New note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Updated note',
    notesFireUrl: '[Notes] Updated image url',
    notesDelete: '[Notes] Delete note',
    notesLogoutCleaning: '[Notes] Logout cleaning',
}