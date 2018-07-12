import {
    LOGIN_CLICKED_SUCCESS,
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
    REMOVE_TRIP_ERROR,
    OPEN_MARKER,
    CLOSE_MARKER,
    CLOSE_TRIP_MARKERS
} from '../actions/protected-data';


// REFACTOR AT SOME POINT - PERHAPS PLACE TRIPS STATE IN RESULTS
import {
    SAVE_PLACE_TO_TRIP_SUCCESS,
    SAVE_TRIP_SUCCESS
} from '../actions/results'

const initialState = {
    loggingIn: false,
    results: [],
    next_page_token:'',
    trips: [],
    tripResults: [],
    tripPlaceDetails: [],
    tripPlaceDetails: null,
    data: '',
    error: null,
    isOpen: false,
    location: {
      lat: 37.782,
      lng: -122.403
    },
    loading: false,
    comments: []
};

export function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } 
  
    else if(action.type === FETCH_RESULTS_SUCCESS) {
        return Object.assign({}, state, {
            results: action.results,
            next_page_token: action.next_page_token,
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
        if (currentResults.length >= 1) {
            if(currentResults[0].tripId.includes(deletedTrip[0].id)) {
                currentResults = [];
            }
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
        let currentResults = [...state.tripResults];
        let updateResults = [...state.tripResults];
        if (currentResults.length >= 1) {
            if (currentResults[0].tripId.includes(action.tripId)) {
                updateResults = [action.place, ...state.tripResults];
            }
        }
        return Object.assign({}, state, {
            tripResults: updateResults
        });
    } else if(action.type === SAVE_TRIP_SUCCESS) {
        return Object.assign({}, state, {
            trips: [...state.trips, action.trip]
        });
    } else if(action.type === OPEN_MARKER) {
        return Object.assign({}, state, {
            isOpen: true
        });
    } else if(action.type === CLOSE_MARKER) {
        return Object.assign({}, state, {
            isOpen: false
        });
    } else if(action.type === CLOSE_TRIP_MARKERS) {
        return Object.assign({}, state, {
            tripResults: []
        });
    } else if(action.type === LOGIN_CLICKED_SUCCESS) {
        return Object.assign({}, state, {
            loggingIn: !state.loggingIn
        });
    }
    return state;
}

export default reducer;