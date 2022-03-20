import {MOVIE_DETAIL, MOVIES_TITLE, MOVIES_GENRE, LOGOUT} from '../types';

const initialState = {
    film: {},
    peliculas: [],
    genero: []
};

const busquedaFilmsReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case MOVIE_DETAIL :
            return {...state, film: action.payload};

        case MOVIES_TITLE :
            return {...state, peliculas: action.payload};
        
        case MOVIES_GENRE :
            return {...state, genero: action.payload};
        
        case LOGOUT :
            return initialState;

        default :
            return state
    }
}

export default busquedaFilmsReducer;