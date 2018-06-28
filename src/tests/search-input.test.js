import React from 'react';
import {shallow, configure} from 'enzyme';
import Search from '../components/search-input';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Search input renders without crashing', () => {
  it('renders without crashing', () => {
    const onSubmit=jest.fn();
    const dispatch=jest.fn();
    shallow(<Search dispatch={dispatch} onSubmit={onSubmit}/>);
  });
});