import { reducer } from '../reducers/results';

describe('reducer', () => {
  it('should return initial state of reducer', () => {
    const state = reducer(undefined, { type: 'Test' });
    expect(state).toEqual({
      added: false,
      open: false,
      details: null,
      tripPlaceDetails: null,
      tripPlaceOpen: false,
      tripDropdown: false,
      tripDropdownElement: null,
      error: null,
      loading: false,
      tripClicked: false
    })
  })
  
  it('should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, { type: 'unknown' });
    expect(state).toBe(currentState)
  })
});