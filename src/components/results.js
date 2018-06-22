import React from 'react';
import {connect} from 'react-redux';
import { openMoreDetails, closeMoreDetails, fetchPlacesDetails, savePlace } from '../actions/results';
import { setMarkerLocation } from '../actions/protected-data';

class Results extends React.Component {
    clicked(inc) {
        if (inc === this.props.clicked) {
            this.props.dispatch(closeMoreDetails());
        }
        else {
            this.props.dispatch(openMoreDetails(inc));
            this.props.dispatch(fetchPlacesDetails(this.props.results[inc].place_id));
            this.props.dispatch(setMarkerLocation(this.props.results[inc].geometry.location))
            console.log(this.props.results)
            // console.log(this.props.results[inc].geometry.location)
            // console.log(this.props.result.details.geometry);
            // console.log(this.props.results[inc].photos[0].photo_reference)
            // console.log(this.props.results[inc].photos[0].html_attributions)
            // this.props.dispatch(fetchPhoto(this.props.results[inc].photos[0].photo_reference))
            console.log(this.props)
        }
    }

    save(inc) {
        this.props.dispatch(savePlace(this.props.details, this.props.results[inc].place_id));
    }

    render() {
        let dynamicHeight;
        let list;
        let details;
        if (this.props.results.length >= 1) {
        list = this.props.results.map((result, inc) => { 
            // make sure the 0 index isn't expanded
            if (this.props.clicked === false) {
                dynamicHeight = '100px'
            }
            // expand the clicked box, include details
            if (inc === Number(this.props.clicked) && this.props.clicked !== false && this.props.details !== null 
            // &&this.props.photo !== null
            ) {
                dynamicHeight = '300px'
                details = 
                <div className="search-result">
                    <div>
                        Rating: {this.props.details.rating}
                    </div>
                    <div>
                        {this.props.details.formatted_address}    
                    </div>
                    <div>       {this.props.details.formatted_phone_number}
                    </div>
                    <a href={this.props.details.website} target="_blank">
                        {`${this.props.details.name} official website`}
                    </a>
                   <div>
                        <img className={'results-pic'}src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=${this.props.details.photos[0].photo_reference}&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`} alt={`${this.props.details.name}`} className="place-photo"/>
                        <span className={`${this.props.details.photos[0].html_attributions[0]}`}></span>
                    </div>
                     <div>
                    {/* if user has a trip display save button (this.props.tripResults >= 1) */}
                     <button onClick={(e) => {
                        e.stopPropagation();
                        // dispatch action to toggle state of display for dropdown
                        this.save(inc);
                     }}>
                        add to trip
                     </button>
                     {/* pseudo-
                        this.props.showDropdown ? 
                        this.props.tripResults.map((trip, index) => {
                            <button onClick={(e) => {
                                e.stopPropagation();
                                this.save(index)
                            }}>trip.name</button>
                        }) :
                        null
                     */}
                     <button onClick={(e) => {
                        e.stopPropagation();
                         
                     }}>
                        start new trip
                     </button>
                 </div>
                </div>
            }
            // keep box regular size
            else {
                dynamicHeight = '100px'
                details = null;
            }
            return (
                <div 
                key={inc} 
                id={inc} 
                className={'result-map-list'}
                style={{innerWidth: '100px', height: dynamicHeight, border: 'solid 1px black'}} 
                onClick={() => {
                    this.clicked(inc)
                }}
                >
                    {result.name}
                    {details}
                </div>
                )
            });
        }
        return (
            <div className={"result-map-view"}>
                {list}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.protectedData.results,
        tripResults: state.protectedData.tripResults,
        clicked: state.result.open,
        details: state.result.details,
        next_page_token: state.protectedData.next_page_token
    }
};

export default connect(mapStateToProps)(Results)