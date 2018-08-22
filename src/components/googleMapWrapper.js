import React from 'react';
import GoogleMapComponent from './googleMap';
import { connect } from 'react-redux';
import { setDefaultLocation, fetchGeolocationAddress } from '../actions/protected-data';

export class GoogleMapWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
		    lng: 0
      }
    };
  };

  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userlocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.props.dispatch(setDefaultLocation(userlocation));
          this.props.dispatch(fetchGeolocationAddress(userlocation.lat, userlocation.lng));
          this.setState(prevState => ({
            location: {
              ...prevState.location,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }))
        },
        error => {
          console.log(error);
        }
      )
    } 
  }
  render() {
    return (
      <GoogleMapComponent 
      position={this.state.location}
      results={this.props.results}
      location={this.props.location}
      tripResults={this.props.tripResults}
      />
    );
  }
};

const mapStateToProps = state => {
    return {
      results: state.protectedData.results,
      location: state.protectedData.location,
      tripResults: state.protectedData.tripResults
    }
};
  
export default connect(mapStateToProps)(GoogleMapWrapper);