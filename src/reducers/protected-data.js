import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_RESULTS_SUCCESS,
    FETCH_RESULTS_ERROR,
    DEFAULT_LOCATION,
    SEARCH_LOCATION,
    FETCH_TRIPS_SUCCESS,
    FETCH_TRIPS_ERROR,
    FETCH_TRIP_DETAILS_SUCCESS,
    FETCH_TRIP_DETAILS_ERROR
} from '../actions/protected-data';


const initialState = {
    results: [],
    next_page:'',
    trips: [],
    tripResults: [],
    data: '',
    error: null,
    location: {
      lat: 37.782,
      lng: -122.403
    }
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
            results: action.results,
            next_page: action.next_page_token
        });
    } else if(action.type === FETCH_RESULTS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === DEFAULT_LOCATION) {
        return Object.assign({}, state, {
            location: action.location
        });
    } else if(action.type === SEARCH_LOCATION) {
        return Object.assign({}, state, {
            location: action.location
        });
    } else if(action.type === FETCH_TRIPS_SUCCESS) {
        return Object.assign({}, state, {
            trips: action.results
        })
    } else if(action.type === FETCH_TRIPS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === FETCH_TRIP_DETAILS_SUCCESS) {
        console.log(action.results)
        return Object.assign({}, state, {
            tripResults: action.results
        });
    } else if(action.type === FETCH_TRIP_DETAILS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
