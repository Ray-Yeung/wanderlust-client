// VERSION 2.0 MAP COMPONENT
import React from 'react';
import PlaceMarker from './place-marker';
import TripMarker from './trip-marker';
import { styles } from './mapStyle';
import {GOOGLE_API_KEY} from '../config';

const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const GoogleMapsWrapper = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className={'map-contianer'} />,
    mapElement: <div className="map-view" />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    zoom={12}
    ref={(map) => map && map.panTo(props.location) }
    defaultOptions={{
      styles, 
      scrollwheel: true
    }} 
  >
    {/* results */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={30}   //changes size of cluster area
      maxZoom={15}    //changes how far map zooms when clicking cluster
      defaultMinimumClusterSize={10}  //minimum cluster size
    >
      {props.results.map((marker, index) => (
        <PlaceMarker
          key={index}
          index={index}
          marker={marker}
        />
      ))}
    </MarkerClusterer>

    {/* tripResults */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={30}   //changes size of cluster area
      maxZoom={15}    //changes how far map zooms when clicking cluster
      defaultMinimumClusterSize={5}  //minimum cluster size
    >
      {props.tripResults.map((marker, index) => (
        <TripMarker
          key={index}
          index={index}
          marker={marker}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class GoogleMapComponent extends React.PureComponent {
  render() {
    return (
      <GoogleMapsWrapper 
        results={this.props.results} 
        location={this.props.location}
        tripResults={this.props.tripResults}
      />
    )
  }
}

export default GoogleMapComponent;