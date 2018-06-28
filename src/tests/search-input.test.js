import React from 'react';
import {shallow, configure} from 'enzyme';
import {Search} from '../components/search-input';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Search />', () => {
  it('Renders without crashing', () => {
    shallow(<Search />);
  });

//   it('Renders the search form', () => {
//     const wrapper = shallow(<Search />);
//     expect(wrapper.hasClass('form-search')).toEqual(true);
//   });

});

