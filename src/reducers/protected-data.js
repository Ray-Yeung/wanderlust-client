import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_RESULTS_SUCCESS,
    FETCH_RESULTS_ERROR
} from '../actions/protected-data';

const initialState = {
    results: [],
    data: '',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === FETCH_RESULTS_SUCCESS) {
        return Object.assign({}, state, {
            results: [...state.results, action.results]
        });
    } else if(action.type === FETCH_RESULTS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
