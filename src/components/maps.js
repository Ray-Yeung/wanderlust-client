import React from 'react'
import {compose, withProps, withHandlers, withState} from "recompose"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        fields: {},
        currentLocation: {}
    };

    async componentDidMount() {
        const {lat, lng} = await this.getcurrentLocation();
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
    //for loop Markers
    //<Markers>
    //input data from JSON Lat, lng 
    onMarkerClick = (props, marker, e) => this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: !this.state.showingInfoWindow
    });

    getcurrentLocation() {
        if (navigator && navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator
                    .geolocation
                    .getCurrentPosition(pos => {
                        const coords = pos.coords;
                        resolve({lat: coords.latitude, lng: coords.longitude});
                    });
            });
        }
        return {lat: 0, lng: 0};
    }
    fetchPlaces(mapProps, map) {
        const {google} = mapProps;
        const service = new google
            .maps
            .places
            .PlacesService(map);
        // ...
    }
    render() {
        console.log('here is google ', this.props.google)
        console.log('here is the props', this.props)
        const style = {}

        return (
            <div>

                {/* <h1>hello world</h1> */}
                <div className={'map'}>
                    <Map
                        google={this.props.google}
                        initialCenter={this.state.fields.location}
                        center={this.state.fields.location}
                        zoom={14}>
                        <Marker
                            onClick={this.onMarkerClick}
                            position={this.state.fields.location}
                            name={'Current location'}/>
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                            </div>
                        </InfoWindow>

                    </Map>
                </div>
            </div>
        );
    }

}

export default GoogleApiWrapper({apiKey: ('AIzaSyDcXgfc08bFKvh2HkOilaX112ghHvyRBkU')})(MapContainer)