import React from 'react';
import {connect} from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps';
import PlaceMarker from './place-marker';


// render the map
const GoogleMapsWrapper = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap 
        defaultZoom={12}
        defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
      >
        <MarkerClusterer
          averageCenterenableRetinaIcons
          gridSize={30}
        >
          {props.results.map((marker, index) => {
            return (
              <Marker 
                key={index}
                position={marker.geometry.location}
              />
            )
          })}
        </MarkerClusterer>
      </GoogleMap>
    );
  })
);


// details of the map
// const GoogleMapComponent = props => {
//   let height = 'calc(100vh - 50px)';
//   if(props.path === '/report') {
//     height = '35vh';
//   }
//   return (
//     <GoogleMapsWrapper
//     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM&v=3.exp&libraries=geometry,drawing,places"
//     loadingElement={<div style={{ height: `100%` }} />}
//     containerElement={<div style={{ height: `400px` }} />}
//     mapElement={<div style={{ height: `100%` }} />}
//     onBoundsChanged={props.onBoundsChanged}
//     defaultZoom={12}
//     onClick={props.onHandleClick}
//     >
    
//       <MarkerClusterer
//         onClick={props.onMarkerClustererClick}
//         averageCenter
//         enableRetinaIcons
//         gridSize={30} // change for size of cluster area
//         maxZoom={15} // change how far map zooms when clicking cluster
//         defaultMinimumClusterSize={2} // minimu cluster size
//       >
//         {/* populated markers */}
//         {/* {props.isMarkerShown &&
//           props.markers.map((marker, index) => {
//             return <PlaceMarker marker={marker} key={index} />;
//           })
//         } */}
//          {props.results.map((marker, index) => {
//         return (
//           <Marker 
//             key={index}
//             position={marker.geometry.location}
//           />
//         )
//       })}
//       </MarkerClusterer>
//     </GoogleMapsWrapper>
//   );
// };

class GoogleMapComponent extends React.Component {
  render() {
    return (
      <GoogleMapsWrapper
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
};
  


export default connect(mapStateToProps)(GoogleMapComponent);