import React from 'react';
// import {connect} from 'react-redux';
import { fetchSearchApi } from '../../actions/protected-data';

export class Search extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    const search = document.getElementById("searchInput").value;
    this.props.dispatch(fetchSearchApi(search));
  }

  render() {
    return (
      <div>
        <form>
          <label className="search_label">Search Here</label> <br/>
          <input
            type="text"
            className="search_input"
            id="searchInput"
            placeholder="E.g. Restaurants"
          /> <br/>
          <button className="search_button" type="submit">Search</button>
          <br/>
        </form>
      </div>
    );
  }
}

export default Search;