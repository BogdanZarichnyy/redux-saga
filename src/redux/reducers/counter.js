import { DECREASE_COUNT, INCREASE_COUNT } from '../constants';

const initialState = {
    count: 0,
};

const counterReducer = (state = initialState, { type }) =>  {
    switch(type) {
        case DECREASE_COUNT: return { ...state, count: state.count - 1 };
        case INCREASE_COUNT: return { ...state, count: state.count + 1 };
        default: return state;
    }
}

export default counterReducer;