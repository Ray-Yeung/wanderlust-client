import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

export default class PlaceMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  
  onToggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return(
      <Marker
        key={this.props.index}
        position={this.props.marker.geometry.location}
        onClick={() => this.onToggleOpen()}
      >
        {this.state.isOpen && (
          <InfoWindow style={{Container: 'red'}} onCloseClick={() => this.onToggleOpen()}>
            <div className='marker-info'>
              <h1 className='marker-header'>Test</h1>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
};