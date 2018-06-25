import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_RESULTS_SUCCESS,
    FETCH_RESULTS_ERROR,
    DEFAULT_LOCATION,
    SEARCH_LOCATION,
    MARKER_LOCATION,
    FETCH_TRIPS_SUCCESS,
    FETCH_TRIPS_ERROR,
    FETCH_TRIP_DETAILS_SUCCESS,
    FETCH_TRIP_DETAILS_ERROR,
    REMOVE_PLACE_SUCCESS,
    REMOVE_PLACE_ERROR,
    REMOVE_TRIP_SUCCESS,
    REMOVE_TRIP_ERROR
} from '../actions/protected-data';


// REFACTOR AT SOME POINT - PERHAPS PLACE TRIPS STATE IN RESULTS
import {
    SAVE_PLACE_TO_TRIP_SUCCESS,
    SAVE_TRIP_SUCCESS
} from '../actions/results'

const initialState = {
    results: [],
    next_page:'',
    trips: [],
    tripResults: [],
    tripPlaceDetails: [],
    data: '',
    error: null,
    location: {
      lat: 37.782,
      lng: -122.403
    },
    loading: false
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
            next_page: action.next_page_token,
            loading: false
        });
    } else if(action.type === FETCH_RESULTS_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            loading: false
        });
    } else if(action.type === DEFAULT_LOCATION) {
        return Object.assign({}, state, {
            location: action.location
        });
    } else if(action.type === SEARCH_LOCATION) {
        return Object.assign({}, state, {
            location: action.location
        });
    } else if(action.type === MARKER_LOCATION) {
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
        return Object.assign({}, state, {
            tripResults: action.results
        });
    } else if(action.type === FETCH_TRIP_DETAILS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === REMOVE_PLACE_SUCCESS) {
        let placeArray = [...state.tripResults]
        let deleteIndex = placeArray.map(function(place){
        return place.id;
        }).indexOf(action.id)
        placeArray.splice(deleteIndex, 1)
        return Object.assign({}, state, {
            tripResults: placeArray
        });
    } else if(action.type === REMOVE_PLACE_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if(action.type === REMOVE_TRIP_SUCCESS) {
        let tripArray = [...state.trips]
        let deleteIndex = tripArray.map(function(trip){
        return trip.id;
        }).indexOf(action.id)
        
        let deletedTrip = tripArray.splice(deleteIndex, 1)
        // check to see if first result of selected trip matched our deleted trip
        // if it did, remove the tripResults from the dom...
        let currentResults = [...state.tripResults];
        if (currentResults[currentResults.length - 1].name.includes(deletedTrip[0].name)) {
            currentResults = [];
        }
        return Object.assign({}, state, {
            trips: tripArray,
            tripResults: currentResults
        });
    } else if(action.type === REMOVE_TRIP_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } 
    // RESULTS ACTIONS - REFACTOR AT SOME POINT 
    // - SAVE_PLACE_TO_TRIP REQUEST AND ERROR ARE IN RESULTS REDUCER
    else if(action.type === SAVE_PLACE_TO_TRIP_SUCCESS) {
        return Object.assign({}, state, {
            tripResults: [action.place, ...state.tripResults]
        });
    }
    else if(action.type === SAVE_TRIP_SUCCESS) {
        return Object.assign({}, state, {
            trips: [...state.trips, action.trip]
        });
    }
    return state;
}
