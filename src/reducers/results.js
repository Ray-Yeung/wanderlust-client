import {
    OPEN_MORE_DETAILS,
    CLOSE_MORE_DETAILS
} from '../actions/results';

const initialState = {
    open: false
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
    return state;
}