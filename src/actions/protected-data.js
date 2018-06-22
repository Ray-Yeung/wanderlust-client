import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const fetchResultsSuccess = (results, next_page_token) => ({
    type: FETCH_RESULTS_SUCCESS,
    results,
    next_page_token
});

export const FETCH_RESULTS_ERROR = 'FETCH_RESULTS_ERROR';
export const fetchResultsError = error => ({
    type: FETCH_RESULTS_ERROR,
    error
});

export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const fetchTripsSuccess = results => ({
    type: FETCH_TRIPS_SUCCESS,
    results
});

export const FETCH_TRIPS_ERROR = 'FETCH_TRIPS_ERROR';
export const fetchTripsError = error => ({
    type: FETCH_TRIPS_ERROR,
    error
});

export const FETCH_TRIP_DETAILS_SUCCESS = 'FETCH_TRIP_DETAILS_SUCCESS';
export const fetchTripDetailsSuccess = results => ({
    type: FETCH_TRIP_DETAILS_SUCCESS,
    results
});

export const FETCH_TRIP_DETAILS_ERROR = 'FETCH_TRIP_DETAILS_ERROR';
export const fetchTripDetailsError = error => ({
    type: FETCH_TRIP_DETAILS_ERROR,
    error
});

export const REMOVE_PLACE_SUCCESS = 'REMOVE_PLACE_SUCCESS';
export const removePlaceSuccess = place => ({
    type: REMOVE_PLACE_SUCCESS,
    place
});

export const REMOVE_PLACE_ERROR = 'REMOVE_PLACE_ERROR';
export const removePlaceError = error => ({
    type: REMOVE_PLACE_ERROR,
    error
});

export const REMOVE_TRIP_SUCCESS = 'REMOVE_TRIP_SUCCESS';
export const removeTripSuccess = id => ({
    type: REMOVE_TRIP_SUCCESS,
    id
});

export const REMOVE_TRIP_ERROR = 'REMOVE_TRIP_ERROR';
export const removeTripError = error => ({
    type: REMOVE_TRIP_ERROR,
    error
});

export const DEFAULT_LOCATION = 'DEFAULT_LOCATION';
export const defaultLocation = location => ({
  type: DEFAULT_LOCATION,
  location
});

export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const searchLocation = location => ({
  type: SEARCH_LOCATION,
  location
});

export const MARKER_LOCATION = 'MARKER_LOCATION';
export const markerLocation = location => ({
  type: MARKER_LOCATION,
  location
});

export const setDefaultLocation = locationObj => dispatch => {
  dispatch(defaultLocation(locationObj));
};
  
export const setSearchLocation = locationObj => dispatch => {
  dispatch(searchLocation(locationObj));
};

export const setMarkerLocation = locationObj => dispatch => {
  dispatch(markerLocation(locationObj));
}

export const removePlace = (placeId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/places/${placeId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => dispatch(removePlaceSuccess(data)))
    // .then(history.push('/dashboard'))
    .catch(error => dispatch(removePlaceError(error)))
};

export const removeTrip = (tripId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return dispatch(removeTripSuccess(tripId))
    })
    // .then(data => {
    //     console.log(data)
    //     return dispatch(removeTripSuccess(data))})
    .catch(error => dispatch(removeTripError(error)))
};

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchResultsSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

export const fetchSearchApi = (data) => (dispatch, getState) =>{
    const authToken = getState().auth.authToken;
    return fetch(`https://fast-beach-47884.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${data}&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
    })
    .then(response => response.json())
    .then(data => {
        dispatch(fetchResultsSuccess(data.results, data.next_page_token))
        dispatch(setSearchLocation(data.results[0].geometry.location))
    })
    .catch(err => dispatch(fetchResultsError(err)))
};

export const fetchTrips = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/trips`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {data.location.lat = parseFloat(data.location.lat, 10), data.location.lng = parseFloat(data.location.lng, 10)});
        dispatch(fetchTripsSuccess(data))
    })
    .catch(err => dispatch(fetchTripsError(err)))
};

export const fetchTripDetails = (tripId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/places/?tripId=${tripId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {data.location.lat = parseFloat(data.location.lat, 10), data.location.lng = parseFloat(data.location.lng, 10)});
        dispatch(fetchTripDetailsSuccess(data))
    })
    .catch(err => dispatch(fetchTripDetailsError(err)))
};