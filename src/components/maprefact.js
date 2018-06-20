// VERSION 1.0 (ONLY FOR REFERENCE)
// IGNORE

/*global google*/
import _  from "lodash";
//Why using loDash?
// Lodash makes JavaScript easier by taking the hassle out of working with arrays,
// numbers, objects, strings, etc. Lodash’s modular methods are great for:
// * Iterating arrays, objects, & strings
// * Manipulating & testing values
// * Creating composite functions
import React from 'react'
import { compose, withProps, lifecycle } from "recompose";
// * compose -Use to compose multiple higher-order components into a single higher-order component.

// * withProps - the newly created props are merged with the owner props.
// Instead of a function, you can also pass a props object directly. In this form, it is similar to
//  defaultProps(), except the provided props take precedence over props from the owner.

//lifecycle - A higher-order component version of React.Component(). It supports the entire Component
// API, except the render() method, which is implemented by default (and overridden if specified;
//  an error will be logged to the console). You should use 
// this helper as an escape hatch, in case you need to access component lifecycle methods.
// Any state changes made in a lifecycle method, by using setState, will be propagated to 
// the wrapped component as props

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";


const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
        
      const refs = {}
        console.log("here is my refs",refs)
        console.log('what does LoDash', {_})
      this.setState({
        bounds: null,
        center: {
          lat: 33.976332, lng: -117.704449
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        //   refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  //if you don't use withScriptjs, you have to put a 
//   <script/> tag for Google Maps JavaScript API v3 in your HTML's <head/> element
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Where do you want to go?"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
);
export default class MyFancyComponent extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
          currentLatLng: {
            lat: 0,
            lng: 0
          },
          isMarkerShown: false
        }
      }
    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        } else {
            error => console.log(error)
        }
    }
    render() {
      return (
        <MapWithASearchBox 
        center={this.state.currentLatLng}
        />
      )
    }
  }
