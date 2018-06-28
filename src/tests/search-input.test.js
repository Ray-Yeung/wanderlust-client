import React from 'react';
import {shallow} from 'enzyme';
import Search from '../components/search-input';

describe('Search />', () => {
  it('Renders without crashing', () => {
    shallow(<Search />);
  });
});