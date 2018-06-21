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
    FETCH_TRIP_DETAILS_ERROR
} from '../actions/protected-data';


const initialState = {
    results: [],
    next_page:'',
    trips: [],
    tripResults: [
        {
            "formatted_address": "525 SW Morrison St, Portland, OR 97204, USA",
            "geometry": {
            "location": {
            "lat": 45.518943,
            "lng": -122.6777971
            },
            "viewport": {
            "northeast": {
            "lat": 45.52026502989272,
            "lng": -122.6764624201073
            },
            "southwest": {
            "lat": 45.51756537010728,
            "lng": -122.6791620798927
            }
            }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
            "id": "9c91fdbe4bb4174c7c2319c4b6d72f2ea612272a",
            "name": "Departure Restaurant + Lounge",
            "opening_hours": {
            "open_now": false,
            "weekday_text": []
            },
            "photos": [
            {
            "height": 1152,
            "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/114882428374659034538/photos\">Departure Portland Restaurant + Lounge</a>"
            ],
            "photo_reference": "CmRaAAAA4a6X0JlTPOgALUObvsxm_7saOM5Bc5jdfQ126M1M-AxXYnRgHP72CoEGFiSbEVTJTHbzg_oumwjnSO167fHF-WdEYJEVgKd05SbiOID35Eqq0UpWTm-3I1xLe8QRJPRuEhB_Qxuj6pdfYs5LYrdQiEPNGhRfxKUbghWdg1HElzkUV1yFyiFm9w",
            "width": 2048
            }
            ],
            "place_id": "ChIJleNCqAUKlVQRJewBNCXtRRU",
            "price_level": 3,
            "rating": 4.3,
            "reference": "CmRbAAAABceCxZm3GfgfXfZCcVpcE1RD0fYYD4G4fLkd7s5g5jpmPpzHpQkQrJzaAVjIDoZ3k6bOLwUEujXBJz2vf06EKn2mCEfDAugM8vLhVaZVwT4miPWGx3buAJGTVrwZ684UEhAZI2T9iPrrkd45hblr1cJlGhT4tDkfHWQAb020sglpLlxaVyE04Q",
            "types": [
            "night_club",
            "bar",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
            ]
            },
            {
            "formatted_address": "1239 SW Broadway, Portland, OR 97205, USA",
            "geometry": {
            "location": {
            "lat": 45.515572,
            "lng": -122.682
            },
            "viewport": {
            "northeast": {
            "lat": 45.51688247989271,
            "lng": -122.6804999201073
            },
            "southwest": {
            "lat": 45.51418282010727,
            "lng": -122.6831995798928
            }
            }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
            "id": "94885de23b614753f021a684fb4d042cb95364f2",
            "name": "Higgins",
            "opening_hours": {
            "open_now": true,
            "weekday_text": []
            },
            "photos": [
            {
            "height": 3024,
            "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/110364750206874106884/photos\">rod mason</a>"
            ],
            "photo_reference": "CmRaAAAAqz26FKiuX9MoVCRMiX-J05rgAWx5OHoQxbmmqegw6CrxhBHBzOi4BLIVwzzWrZkhIWgdPcYW6NClo6mbxP2060DjWWWjVYM8wfX5tiKpDU53cctxVSdCN3GtCtD97biREhA_xY69hTsJLklYvm1Ji6EvGhSKDHye8NY45Cobru65N2nxLxXWEw",
            "width": 4032
            }
            ],
            "place_id": "ChIJ6UnKghoKlVQRDec3N8_R2fE",
            "price_level": 3,
            "rating": 4.5,
            "reference": "CmRbAAAAX_u8tbyVRGHnCmDIxoE6Nn3AkdA6Hs6IckTeR_hMCTaldbPkItqIqS3k8k8OybDUGYufHsCkJxy38bmvbPEqwNe09hYDtI3U5dRit1vsmXU07buODpWg_Tx6Uv-7O-pKEhBoTWpEtIMx6k4x1SUHN_gpGhSF-1NLfJp5-XHcgqIWSwYFX9TyJA",
            "types": [
            "bar",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
            ]
            }
    ],
    tripPlaceDetails: [],
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
