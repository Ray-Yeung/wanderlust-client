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

export const setDefaultLocation = locationObj => dispatch => {
  dispatch(defaultLocation(locationObj));
};
  
export const setSearchLocation = locationObj => dispatch => {
  dispatch(searchLocation(locationObj));
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
    return fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${data}&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
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
        dispatch(fetchTripsSuccess(data))
    })
    .catch(err => dispatch(fetchTripsError(err)))
};

export const fetchTripDetails = (tripId) => (dispatch, getState) => {
    console.log(tripId)
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/places/?tripid=${tripId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        dispatch(fetchTripDetailsSuccess(data))
    })
    .catch(err => dispatch(fetchTripDetailsError(err)))
};