import {
    OPEN_MORE_DETAILS,
    CLOSE_MORE_DETAILS,
    OPEN_TRIP_PLACE_MORE_DETAILS,
    CLOSE_TRIP_PLACE_MORE_DETAILS,
    FETCH_DETAILS_ERROR,
    FETCH_DETAILS_SUCCESS,
    SAVE_PLACE_ERROR,
    SAVE_PLACE_SUCCESS,
    SAVE_TRIP_REQUEST,
    SAVE_TRIP_ERROR,
    SAVE_TRIP_SUCCESS,
    FETCH_TRIP_PLACE_DETAILS_SUCCESS,
    FETCH_TRIP_PLACE_DETAILS_ERROR
} from '../actions/results';

const initialState = {
    open: false,
    details: null,
    tripPlaceDetails: null,
    tripPlaceOpen: false,
    error: null,
    loading: false
};

export default function reducer(state = initialState, action) {
    if (action.type === OPEN_MORE_DETAILS) {
        return Object.assign({}, state, {
            open: action.item
        });
    }
    else if (action.type === CLOSE_MORE_DETAILS) {
        return Object.assign({}, state, {
            open: false
        })
    }
    else if (action.type === FETCH_DETAILS_ERROR) {
        return Object.assign({}, state, {
            details: null
        })
    }
    else if (action.type === FETCH_DETAILS_SUCCESS) {
        console.log(action.details);
        return Object.assign({}, state, {
            details: action.details
        })
    }
    else if (action.type === SAVE_PLACE_ERROR) {
        return Object.assign({}, state, {

        })
    }
    else if (action.type === SAVE_PLACE_SUCCESS) {
        return Object.assign({}, state, {
            
        })
    }
    else if(action.type === SAVE_TRIP_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    }
    else if(action.type === SAVE_TRIP_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: null
        });
    }
    else if(action.type === SAVE_TRIP_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    }
    else if(action.type === FETCH_TRIP_PLACE_DETAILS_SUCCESS) {
        console.log(action.details)
        return Object.assign({}, state, {
            tripPlaceDetails: action.details
        });
    } 
    else if(action.type === FETCH_TRIP_PLACE_DETAILS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    else if (action.type === OPEN_TRIP_PLACE_MORE_DETAILS) {
        return Object.assign({}, state, {
            tripPlaceOpen: action.item
        });
    }
    else if (action.type === CLOSE_TRIP_PLACE_MORE_DETAILS) {
        return Object.assign({}, state, {
            tripPlaceOpen: false
        })
    }

    //Create trip here
    return state;
}