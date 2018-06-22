import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const OPEN_MORE_DETAILS = 'OPEN_MORE_DETAILS';
export const openMoreDetails = item => ({
    type: OPEN_MORE_DETAILS,
    item
});

export const HOLD_DROPDOWN_ELEMENT = 'HOLD_DROPDOWN_ELEMENT';
export const holdDropdownElement = item => ({
    type: HOLD_DROPDOWN_ELEMENT,
    item
});

export const CLOSE_MORE_DETAILS = 'CLOSE_MORE_DETAILS';
export const closeMoreDetails = () => ({
    type: CLOSE_MORE_DETAILS
});

export const OPEN_TRIP_DROPDOWN = 'OPEN_TRIP_DROPDOWN';
export const openTripDropdown = () => ({
    type: OPEN_TRIP_DROPDOWN
});

export const CLOSE_TRIP_DROPDOWN = 'CLOSE_TRIP_DROPDOWN';
export const closeTripDropdown = () => ({
    type: CLOSE_TRIP_DROPDOWN
});

export const OPEN_TRIP_PLACE_MORE_DETAILS = 'OPEN_TRIP_PLACE_MORE_DETAILS';
export const openTripPlaceMoreDetails = item => ({
    type: OPEN_TRIP_PLACE_MORE_DETAILS,
    item
});

export const CLOSE_TRIP_PLACE_MORE_DETAILS = 'CLOSE_TRIP_PLACE_MORE_DETAILS';
export const closeTripPlaceMoreDetails = () => ({
    type: CLOSE_TRIP_PLACE_MORE_DETAILS
});

export const FETCH_DETAILS_ERROR = 'FETCH_DETAILS_ERROR';
export const fetchDetailsError = () => ({
    type: FETCH_DETAILS_ERROR
});

export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS';
export const fetchDetailsSuccess = (details) => ({
    type: FETCH_DETAILS_SUCCESS,
    details
});

export const FETCH_PHOTO_ERROR = 'FETCH_PHOTO_ERROR';
export const fetchPhotoError = () => ({
    type: FETCH_PHOTO_ERROR
});

export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const fetchPhotoSuccess = (photo) => ({
    type: FETCH_PHOTO_SUCCESS,
    photo
});

export const SAVE_PLACE_ERROR = 'FETCH_PLACE_ERROR';
export const savePlaceError = () => ({
    type: SAVE_PLACE_ERROR
});

export const SAVE_PLACE_SUCCESS = 'SAVE_PLACE_SUCCESS';
export const savePlaceSuccess = () => ({
    type: SAVE_PLACE_SUCCESS
});

export const SAVE_TRIP_REQUEST = 'SAVE_TRIP_REQUEST';
export const saveTripRequest = () => ({
    type: SAVE_TRIP_REQUEST
})

export const SAVE_TRIP_ERROR = 'FETCH_TRIP_ERROR';
export const saveTripError = () => ({
    type: SAVE_TRIP_ERROR
});

export const SAVE_TRIP_SUCCESS = 'SAVE_TRIP_SUCCESS';
export const saveTripSuccess = (trip) => ({
    type: SAVE_TRIP_SUCCESS,
    trip
});

export const SAVE_PLACE_TO_TRIP_REQUEST = 'SAVE_PLACE_TO_TRIP_REQUEST';
export const savePlaceToTripRequest = () => ({
    type: SAVE_PLACE_TO_TRIP_REQUEST
})

export const SAVE_PLACE_TO_TRIP_ERROR = 'SAVE_PLACE_TO_TRIP_ERROR';
export const savePlaceToTripError = (err) => ({
    type: SAVE_PLACE_TO_TRIP_ERROR
});

export const SAVE_PLACE_TO_TRIP_SUCCESS = 'SAVE_PLACE_TO_TRIP_SUCCESS';
export const savePlaceToTripSuccess = (place) => ({
    type: SAVE_PLACE_TO_TRIP_SUCCESS,
    place
});

export const FETCH_TRIP_PLACE_DETAILS_SUCCESS = 'FETCH_TRIP_PLACE_DETAILS_SUCCESS';
export const fetchTripPlaceDetailsSuccess = details => ({
    type: FETCH_TRIP_PLACE_DETAILS_SUCCESS,
    details
});

export const FETCH_TRIP_PLACE_DETAILS_ERROR = 'FETCH_TRIP_PLACE_DETAILS_ERROR';
export const fetchTripPlaceDetailsError = error => ({
    type: FETCH_TRIP_PLACE_DETAILS_ERROR,
    error
});

// COMMENTED OUT FOR NOW AS WE ARE SAVING TO TRIPS - DELETE ONCE FINISHED

// export const savePlace = (placeDetails, placeId) => (dispatch, getState) => {
//     const authToken = getState().auth.authToken;
//     return fetch(`${API_BASE_URL}/places`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//         },
//         body: JSON.stringify({
//             name: placeDetails.name, 
//             location: placeDetails.geometry.location, 
//             photos: placeDetails.photos, 
//             place_id: placeId, 
//             types: placeDetails.types, 
//             price_level:placeDetails.price_level, 
//             rating:placeDetails.rating, 
//             phone_number:placeDetails.formatted_phone_number, 
//             website: placeDetails.website,
//             address: placeDetails.formatted_address
//         })
//     })
//     .then(response => normalizeResponseErrors(response))
//     .then(response => response.json())
//     .then(data => dispatch(savePlaceSuccess()))
//     .catch(err => dispatch(savePlaceError()))
// }

export const saveTrip = (placeDetails, placeId) => (dispatch, getState) => {
    dispatch(saveTripRequest()); //tells us we have bugun loading
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/trips`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            name: placeDetails.name, 
            location: placeDetails.geometry.location, 
            photos: placeDetails.photos, 
            place_id: placeId, 
            address: placeDetails.formatted_address
        })
    })
    .then(response => normalizeResponseErrors(response))
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.location.lat = parseFloat(data.location.lat, 10);
        data.location.lng = parseFloat(data.location.lng, 10);
        dispatch(saveTripSuccess(data))
    })
    .catch(err => dispatch(saveTripError()))
}

export const savePlaceToTrip = (placeDetails, tripId) => (dispatch, getState) => {
    dispatch(savePlaceToTripRequest()); //tells us we have bugun loading
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/places`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            name: placeDetails.name, 
            location: placeDetails.geometry.location, 
            photos: placeDetails.photos, 
            place_id: placeDetails.place_id,
            types: placeDetails.types, 
            price_level: placeDetails.price_level, 
            rating: placeDetails.rating, 
            phone_number: placeDetails.formatted_phone_number, 
            website: placeDetails.website,
            address: placeDetails.formatted_address,
            tripId: tripId
        })
    })
    .then(response => normalizeResponseErrors(response))
    .then(response => response.json())
    .then(data => {
        data.location.lat = parseFloat(data.location.lat, 10);
        data.location.lng = parseFloat(data.location.lng, 10);
        console.log(data);
        dispatch(savePlaceToTripSuccess(data))
    })
    .catch(err => dispatch(savePlaceToTripError(err)))
}

export const fetchPlacesDetails = (placeId) => (dispatch) => {
    return fetch(`https://fast-beach-47884.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,formatted_phone_number,photo,reviews,types,website,geometry,price_level,formatted_address,place_id&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        dispatch(fetchDetailsSuccess(data.result))
    })
    .catch(err => dispatch(fetchDetailsError(err)))
};

export const fetchTripPlacesDetails = (placeId) => (dispatch) => {
    return fetch(`https://fast-beach-47884.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,formatted_phone_number,photo,reviews,types,website,geometry,price_level,formatted_address,place_id&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        dispatch(fetchTripPlaceDetailsSuccess(data.result))
    })
    .catch(err => dispatch(fetchTripPlaceDetailsError(err)))
};


