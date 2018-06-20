import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchTrips, fetchTripDetails} from '../actions/protected-data';

class Trip extends Component {

    componentDidMount() {
        this.props.dispatch(fetchTrips())
    }

    openTrip(inc) {
        console.log('works')
        this.props.dispatch(fetchTripDetails(this.props.trips[inc].id));
    }

    render() {
        let trips;
        if (this.props.trips.length >= 1) {
            trips = this.props.trips.map((trip, inc) =>
                {  
                    return (
                        <div key={inc} onClick={() => this.openTrip(inc)}>
                            {trip.name}
                        </div>
                    );
                }
            );
        }
        return (
            <div>
                {trips}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        trips: state.protectedData.trips
    }
}

export default connect(mapStateToProps)(Trip);