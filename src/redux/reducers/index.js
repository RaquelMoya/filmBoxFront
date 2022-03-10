
import {combineReducers} from 'redux';

import credentials from './datosLogin-reducer';
import search from './busquedaFilms-reducer';
import order from './pedidos-reducer';

const rootReducer = combineReducers({
    credentials,
    search,
    order
});

export default rootReducer;