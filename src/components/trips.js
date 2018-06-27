import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setMarkerLocation } from '../actions/protected-data';
import {fetchTrips, fetchTripDetails, removeTrip} from '../actions/protected-data';
import {openTrip as openClickedTrip} from '../actions/results';
import TripResults from './tripResults';
class Trip extends Component {
    componentDidMount() {
        this.props.dispatch(fetchTrips())
    }

    openTrip(inc) {
        this.props.dispatch(fetchTripDetails(this.props.trips[inc].id));
        this.props.dispatch(setMarkerLocation(this.props.trips[inc].location))
        if (this.props.tripClicked === false) {
            this.props.dispatch(openClickedTrip(inc));
        }
        else {
            this.props.dispatch(openClickedTrip(false));
        }
    }

    render() {
        let trips;
        if (this.props.trips.length >= 1) {
            trips = this.props.trips.map((trip, inc) =>
                {  
                    let results;
                    if (this.props.tripClicked === inc) {
                        results = <TripResults />
                    }
                    return (
                        <div className={"trips-data"} key={inc}>
                        <div className={"showing-trips"} key={inc} onClick={() =>  this.openTrip(inc)}>
                            {trip.name}
                            <div className="delete-data" >
                            <button className={"delete-button"} onClick={(e) => { 
                                e.stopPropagation();
                                if (window.confirm(`Are you sure you want to delete ${this.props.trips[inc].name}?`)) this.props.dispatch(removeTrip(this.props.trips[inc].id))
                            }}>DELETE</button>
                            </div>
                            {results}
                        </div>
                        </div>
                    );
                }
            );
        }
        return (
            <div className={"trips-list"}>
                {trips}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        trips: state.protectedData.trips,
        tripClicked: state.result.tripClicked
    }
}

export default connect(mapStateToProps)(Trip);