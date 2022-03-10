import {GENERATE_ORDER} from '../types';

const initialState = {
    order: []
};

const pedidosReducer = (state = initialState, action) => {
    switch(action.type){
        
        case GENERATE_ORDER :
            return{...state, order:action.payload};
        
        default :
            return state
    }
}

export default pedidosReducer;