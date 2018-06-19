import {
    OPEN_MORE_DETAILS,
    CLOSE_MORE_DETAILS,
    FETCH_DETAILS_ERROR,
    FETCH_DETAILS_SUCCESS,
    FETCH_PHOTO_SUCCESS
} from '../actions/results';

const initialState = {
    open: false,
    details: null
    // photo: null
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
    if (action.type === FETCH_PHOTO_SUCCESS) {
        console.log(action.photo);
        return Object.assign({}, state, {
            photo: action.photo
        })
    }
    return state;
}