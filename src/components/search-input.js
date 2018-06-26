import React from 'react';
import {connect} from 'react-redux';
import { fetchSearchApi } from '../actions/protected-data';
// import { setSearchLocation } from '../actions/searchActions';

export class Search extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    console.log('clicked');
    const search = document.getElementById("searchInput").value;
    this.props.dispatch(fetchSearchApi(search));
  }

  render() {
    return (
      <div className={"search"}>
        <form className={'form-search'}onSubmit={event => this.onSubmit(event)}> 
          <input
            type="text"
            className={'search-input'}
            id="searchInput"
            placeholder="E.g. Restaurants in San Francisco"
          /> <br/>
          <button className={"search-button"} type="submit">Search</button>
          <br/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  protectedData: state.protectedData.data
});

export default connect(mapStateToProps)(Search);