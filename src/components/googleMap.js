// VERSION 2.0 MAP COMPONENT

import React from 'react';
import PlaceMarker from './place-marker';
import TripMarker from './trip-marker';
const { compose, withProps, withHandlers} = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  TrafficLayer
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const GoogleMapsWrapper = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
    //   console.log(clickedMarkers)
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    center={props.location}
  >
    <TrafficLayer autoUpdate />
    {/* results */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={30}   //changes size of cluster area
      maxZoom={15}    //changes how far map zooms when clicking cluster
      defaultMinimumClusterSize={2}  //minimum cluster size
    >
      {props.results.map((marker, index) => (
        <PlaceMarker
          // icon={tripsResultsIcon}
          key={index}
          marker={marker}
        />
      ))}
    </MarkerClusterer>

    {/* tripResults */}
    <MarkerClusterer>
      {props.tripResults.map((marker, index) => (
        <TripMarker
          key={index}
          marker={marker}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class GoogleMapComponent extends React.PureComponent {
  
  handleMarkerLocation = () => {

  }


  render() {
    return (
      <GoogleMapsWrapper 
        results={this.props.results} 
        location={this.props.location}
        tripResults={this.props.tripResults}
        panTo={this.props.panTo}
      />
    )
  }
}

export default GoogleMapComponent;