import React from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import tripIcon from '../icons/tripIcon';
import '../css/markerStyle.css';

export class TripMarker extends React.Component {
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
  
  markerImage(photosArray) {
    if(photosArray.length === 0) {
      return;
    } else {
      return (
        <div className='clicked-marker-photo'>
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=110&photoreference=${this.props.marker.photos[0].photo_reference}&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`} alt={`${this.props.marker.name}`} className="place-photo" />
          <span className={`${this.props.marker.photos[0].html_attributions[0]}`}></span>
        </div>
      )
    }
  }

  priceLevel(price) {
    if(price) {
      if(price === 1) {
        return (
          <span>
            $
          </span>
        )
      } else if(price === 2) {
        return (
          <span>
            $$
          </span>
        )
      } else if(price === 3) {
        return (
          <span>
            $$$
          </span>
        )
      } else if(price === 4) {
        return (
          <span>
            $$$$
          </span>
        )
      }
    } 
    else {
      return;
    }
  }

  placeType(type) {
    if(type) {
      return (
        <div className='marker-place-desc'>
          {type[0]}
        </div>
      )
    } else {
      return;
    }
  }

  render() {
    return(
      <Marker
        key={this.props.index}
        position={this.props.marker.location}
        icon={tripIcon}
        opacity={0.95}
        onMouseOver={() => this.onToggleOpen()}
        onMouseOut={() => this.onToggleOpen()}
        // labelStyle={{ fontSize: '10px', padding: '15px', opacity: 0.50 }}
      >
          {this.props.index === this.props.clicked&&(
          <InfoWindow>
            <div className='clicked-marker-info'>
              <span>{this.markerImage(this.props.marker.photos)}</span>
              <h3 className='clicked-marker-header'>
                {this.props.marker.name} <br/>
              </h3>
              {this.placeType(this.props.marker.types)}
              <p>
                Rating:{this.props.marker.rating}<br/>
                {this.priceLevel(this.props.marker.price_level)}
              </p>
            </div>
          </InfoWindow>
          )}

          {this.state.isOpen&&(
            <InfoWindow>
              <div className='unclicked-marker-info'>
                <h4 className='unclicked-marker-header'>
                  {this.props.marker.name} <br/>
                </h4>
                {this.placeType(this.props.marker.types)}
              </div>
            </InfoWindow>
          )}
      </Marker>
    );
  }
};

const mapStateToProps = state => {
  return {
    clicked: state.result.tripPlaceOpen
  }
};

export default connect(mapStateToProps)(TripMarker);