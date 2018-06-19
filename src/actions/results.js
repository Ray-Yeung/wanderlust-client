export const OPEN_MORE_DETAILS = 'OPEN_MORE_DETAILS';
export const openMoreDetails = item => ({
    type: OPEN_MORE_DETAILS,
    item
});

export const CLOSE_MORE_DETAILS = 'CLOSE_MORE_DETAILS';
export const closeMoreDetails = () => ({
    type: CLOSE_MORE_DETAILS
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

export const fetchPlacesDetails = (placeId) => (dispatch) => {
    // to fetch:
    //geometry - location
    //icon
    //reviews
    //types
    //website
    return fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,formatted_phone_number,photo,reviews,types,website,geometry,formatted_address,opening_hours,place_id&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        dispatch(fetchDetailsSuccess(data.result))
        // return data.result;
    })
    // .then(data => {
    //     if (data.photos[0]) {
    //         dispatch(fetchPhoto(data.photos[0].photo_reference));
    //     }
    //     else return
    // })
    .catch(err => dispatch(fetchDetailsError(err)))
};

// export const fetchPhoto = (photoId, htmlAtt) => (dispatch) => {
//     return fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=${photoId}&html_attributions=${htmlAtt}&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'img/jpeg'
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         dispatch(fetchPhotoSuccess(data))
//     })
//     .catch(err => dispatch(fetchPhotoError()))
// }