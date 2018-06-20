// import {
//   DEFAULT_LOCATION,
//   SEARCH_LOCATION
// } from '../actions/defaultLocationActions';

// const initialState = {
//   location: {
//     lat: 40.650002,
//     lng: -73.94997
//   }
// };

// export const defaultLocationReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case DEFAULT_LOCATION:
//       return {
//         ...state,
//         location: action.location.userlocation
//       };
//     case SEARCH_LOCATION:
//       return {
//         ...state,
//         location: action.location
//       };
//     default: {
//       return state;
//     }
//   }
// };

// export default function defaultLocation(state = initialState, action) {
//   if(action.type === DEFAULT_LOCATION) {
//     return Object.assign({}, state, {
//       location: action.location
//     });
//   }
//   else if(action.type === SEARCH_LOCATION) {
//     return Object.assign({}, state, {
//       location: action.location
//     });
//   }
//   return state;
// }

// export default defaultLocationReducer;
