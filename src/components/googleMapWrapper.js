import React from 'react';
import GoogleMapComponent from './googleMap';
import { connect } from 'react-redux';

import { setUserLocation } from '../actions/searchActions';
import { setDefaultLocation } from '../actions/defaultLocationActions';

export class GoogleMapWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: true,
      location: {
        lat: 0,
		    lng: 0
      },
      // indicatorPin: {
      //   lat: -34.397,
		  //   lng: 150.644
      // },
      popupIsOpen: false
    };
  };

  // componentDidMount() {
  //   if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //           position => {
  //               const userlocation = {
  //                   lat: position.coords.latitude,
  //                   lng: position.coords.longitude,
  //               };
  //               this.props.dispatch(setDefaultLocation({ userlocation }));
  //               this.setState({
  //                   location: userlocation,
  //               });
  //           },
  //           error => {
  //               console.log(error);
  //           }
  //       );
  //   }
  // }  

  getGeoLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("this is our position coords", position.coords);
          this.setState(prevState => ({
            location: {
              ...prevState.location,
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


  handleMapClick(event) {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    console.log('lat:', lat);
    console.log('lng', lng);
    this.setState({
      indicatorPin: {
        lat,
        lng
      },
    });
    this.props.dispatch(setUserLocation({ lat, lng }));
  }

  onToggleOpen() {
    this.setState({
      popupIsOpen: !this.state.popupIsOpen
    });
  }

  render() {
    this.getGeoLocation()

    return (
      <GoogleMapComponent 
      isMarkerShown={this.state.isMarkerShown}
      onMarkerClick={this.handleMarkerClick}
      position={this.props.defaultLocation}
      onHandleClick={e => this.handleMapClick(e)}
      // indicatorPin={this.state.indicatorPin}
      isOpen={this.state.popupIsOpen}
	    onToggleOpen={() => this.onToggleOpen()}
      results={this.props.results}
      />
    );
  }
};


const mapStateToProps = state => {
    return {
      results: state.protectedData.results,
    //   location: state.defaultLocation.location
    }
};
  


export default connect(mapStateToProps)(GoogleMapWrapper);