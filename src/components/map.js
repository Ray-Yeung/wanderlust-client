// VERSION 1.0 MAP COMPONENT
// IGNORE FOR NOW


import React from 'react';
import {connect} from 'react-redux';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';

const MapWithAMarker = withScriptjs(withGoogleMap(props => 
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 37.805, lng: -122.257 }}
    >
      {props.results.map((marker, index) => {
        return (
          <Marker 
            key={index}
            position={marker.geometry.location}
          />
        )
      })}
    </GoogleMap>
));


class Map extends React.Component {
  render() {
    return (
    <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    results={this.props.results}
    />
    );
  }
};


const mapStateToProps = state => {
  return {
    results: state.protectedData.results
  }
}

export default connect(mapStateToProps)(Map);