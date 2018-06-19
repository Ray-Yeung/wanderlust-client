import {
    OPEN_MORE_DETAILS,
    CLOSE_MORE_DETAILS,
    FETCH_DETAILS_ERROR,
    FETCH_DETAILS_SUCCESS,
    SAVE_PLACE_ERROR,
    SAVE_PLACE_SUCCESS
} from '../actions/results';

const initialState = {
    open: false,
    details: null
};

export default function reducer(state = initialState, action) {
    if (action.type === OPEN_MORE_DETAILS) {
        return Object.assign({}, state, {
            open: action.item
        });
    }
    if (action.type === CLOSE_MORE_DETAILS) {
        return Object.assign({}, state, {
            open: false
        })
    }
    if (action.type === FETCH_DETAILS_ERROR) {
        return Object.assign({}, state, {
            details: null
        })
    }
    if (action.type === FETCH_DETAILS_SUCCESS) {
        console.log(action.details);
        return Object.assign({}, state, {
            details: action.details
        })
    }
    if (action.type === SAVE_PLACE_ERROR) {
        return Object.assign({}, state, {

        })
    }
    if (action.type === SAVE_PLACE_SUCCESS) {
        return Object.assign({}, state, {
            
        })
    }
    return state;
}