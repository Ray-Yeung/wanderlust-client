import React from 'react';
import {connect} from 'react-redux';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    
    
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
    
      {/* {this.props.results.map((index) => {
        console.log(index);
        // let latitude = {this.props.results.geometry.location.lat};
        return (
          <Marker 
            key={index}
            // position={{ lat: {this.props.results.geometry.location.lat}, lng: {this.props.results.geometry.location.lng}}}
          />
        )
      })} */}
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
  ));


class TestMap extends React.Component {
  render() {
    // let map;
    // if(this.props.results.length > 1) {
    // map = this.props.results.map((index) => {

    // })
    // }
    console.log(this.props.results);
    return (
    //   <GoogleMap>
    //     {this.props.results.map((index) => {
    //       return (
    //         <Marker 
    //           key={index}
    //           position={this.props.results.geometry.location}
    //         />
    //       )
    //     })}
    //   </GoogleMap>
    <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
    );
  }
};


const mapStateToProps = state => {
  return {
    results: state.protectedData.results
  }
}

export default connect(mapStateToProps)(TestMap);