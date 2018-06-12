
import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
    fields:{},
    currentLocation:{}
  };
  
  async componentDidMount() {
    const { lat, lng } = await this.getcurrentLocation();
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location: {
          lat,
          lng
        }
      },
      currentLocation: {
        lat,
        lng
      }
    }));
  }

   getcurrentLocation() {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0
    };
  }
  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    // ...
  }
  render() {
    console.log('here is google ',this.props.google)
    console.log('here is the props',this.props)
    return (
      <Map google={this.props.google} 
      initialCenter={this.state.fields.location}
                  center={this.state.fields.location}
                  zoom={14}>
            <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDcXgfc08bFKvh2HkOilaX112ghHvyRBkU')
})(MapContainer)