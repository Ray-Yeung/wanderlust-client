import {IMAGE_KEY} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const fetchImageSuccess = data => ({
    type: FETCH_IMAGE_SUCCESS,
    data
});

export const FETCH_IMAGE_ERROR = 'FETCH_IMAGE_ERROR';
export const fetchImageError = error => ({
    type: FETCH_IMAGE_ERROR,
    error
});



export const fetchImage = () => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`https://api.unsplash.com/search/photos/?query=travel&client_id=${IMAGE_KEY}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {

    })
    .catch(err => dispatch(fetchImageError(err)))
};