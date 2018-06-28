import { reducer } from '../reducers/protected-data';

describe('reducer', () => {
  it('should return initial state of reducer', () => {
    const state = reducer(undefined, { type: 'Test' });
    expect(state).toEqual({
        results: [],
        next_page_token:'',
        trips: [],
        tripResults: [],
        tripPlaceDetails: [],
        data: '',
        error: null,
        isOpen: false,
        location: {
          lat: 37.782,
          lng: -122.403
        },
        loading: false,
        comments: []
    })
  })
  
  it('should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, { type: 'unknown' });
    expect(state).toBe(currentState)
  })
});