import React from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import resultIcon from '../icons/resultIcon';
import '../css/markerStyle.css';

export class PlaceMarker extends React.Component {
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

  // markerImage(photosArray) {
  //   if(photosArray.length === 0) {
  //     return;
  //   } else {
  //     return (
  //       <div>
  //         <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${this.props.marker.photos[0].photo_reference}&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`} alt={`${this.props.marker.name}`} className="place-photo" />
  //         <span className={`${this.props.marker.photos[0].html_attributions[0]}`}></span>
  //       </div>
  //     )
  //   }
  // }

  markerImage(type) {
    if(type === 'airport') {
      return 'https://cdn0.iconfinder.com/data/icons/travel-volume-1-2/256/16-48.png';
    } else if(type === 'amusement_park') {
      return 'https://cdn2.iconfinder.com/data/icons/buildings-6/91/03-48.png';
    } else if(type === 'aquarium') {
      return 'https://cdn4.iconfinder.com/data/icons/animals-pets-3/512/animal-zoo-aquarium-dolphin-48.png';
    } else if(type === 'art_gallery') {
      return 'https://cdn3.iconfinder.com/data/icons/education-1/256/Art-48.png';
    } else if(type === 'atm') {
      return 'https://cdn3.iconfinder.com/data/icons/finance-152/64/21-512.png';
    } else if(type === 'bakery') {
      return 'https://cdn1.iconfinder.com/data/icons/ecommerce-free/96/Shop-48.png';
    } else if(type === 'bank') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/money-48.png';
    } else if(type === 'bar') {
      return 'https://cdn0.iconfinder.com/data/icons/ballicons/128/cocktail_glass-48.png';
    } else if(type === 'bicycle_store') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/bike-48.png';
    } else if(type === 'book_store') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/booklet-48.png';
    } else if(type === 'bus_station') {
      return 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Bus-48.png';
    } else if(type === 'cafe') {
      return 'https://cdn1.iconfinder.com/data/icons/designer-s-tools-1/512/Coffee-48.png';
    } else if(type === 'campground') {
      return 'https://cdn1.iconfinder.com/data/icons/camping-65/500/tent-48.png';
    } else if(type === 'car_rental') {
      return 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Old-Car-2-48.png';
    } else if(type === 'casino') {
      return 'https://cdn4.iconfinder.com/data/icons/ballicons-2-new-generation-of-flat-icons/100/chip-48.png';
    } else if(type === 'church') {
      return 'https://cdn4.iconfinder.com/data/icons/buildings-vol-1-1/256/21-48.png';
    } else if(type === 'clothing_store') {
      return 'https://cdn0.iconfinder.com/data/icons/shopping-vol-1-2/128/P-1-02-48.png';
    } else if(type === 'department_store') {
      return 'https://cdn1.iconfinder.com/data/icons/e-commerce-flat-1/2048/1034_-_Shopping_Mall-48.png';
    } else if(type === 'electronics_store') {
      return 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/latop-48.png';
    } else if(type === 'fire_station') {
      return 'https://cdn3.iconfinder.com/data/icons/funky/136/Fire-48.png';
    } else if(type === 'florist') {
      return 'https://cdn1.iconfinder.com/data/icons/flowers-7/128/flower_flowers_blossom-06-48.png';
    } else if(type === 'furniture_store') {
      return 'https://cdn4.iconfinder.com/data/icons/office-20/128/OFFice-45-48.png';
    } else if(type === 'gas_station') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/gas-48.png';
    } else if(type === 'hospital') {
      return 'https://cdn0.iconfinder.com/data/icons/medical-volume-2-4/256/52-48.png';
    } else if(type === 'jewelry_store') {
      return 'https://cdn3.iconfinder.com/data/icons/finance-152/64/40-48.png';
    } else if(type === 'library') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/bookshelf-48.png';
    } else if(type === 'lodging') {
      return 'https://cdn0.iconfinder.com/data/icons/travel-volume-1-2/256/21-48.png';
    } else if(type === 'movie_theater') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/filmreel-48.png';
    } else if(type === 'museum') {
      return 'https://cdn0.iconfinder.com/data/icons/travel-volume-1-2/256/19-48.png';
    } else if(type === 'night_club') {
      return 'https://cdn0.iconfinder.com/data/icons/ballicons/128/dj-48.png';
    } else if(type === 'park') {
      return 'https://cdn0.iconfinder.com/data/icons/places-and-locations/512/places_and_locations_sunset_park-48.png';
    } else if(type === 'pharmacy') {
      return 'https://cdn0.iconfinder.com/data/icons/health-care-and-medical-2/256/Medical__Health_care-57-48.png';
    } else if(type === 'police') {
      return 'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Police-48.png';
    } else if(type === 'restaurant') {
      return 'https://cdn2.iconfinder.com/data/icons/food-ink/512/restaurant-48.png';
    } else if(type === 'school') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/schooolbus-48.png';
    } else if(type === 'shoe_store') {
      return 'https://cdn4.iconfinder.com/data/icons/e-commerce-and-shopping-3/500/bag-shoe-48.png';
    } else if(type === 'shopping_mall') {
      return 'https://cdn1.iconfinder.com/data/icons/shop-payment-2/128/Shop-Payment-52-48.png';
    } else if(type === 'spa') {
      return 'https://cdn0.iconfinder.com/data/icons/travel-and-holiday-round/64/Travel_spa-48.png';
    } else if(type === 'stadium') {
      return 'https://cdn4.iconfinder.com/data/icons/new-basic-icon-vol-2/512/22-48.png';
    } else if(type === 'store') {
      return 'https://cdn1.iconfinder.com/data/icons/ecommerce-free/96/Shop-48.png';
    } else if(type === 'subway_station') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/train-48.png';
    } else if(type === 'supermarket') {
      return 'https://cdn0.iconfinder.com/data/icons/food-6-7/128/270-48.png';
    } else if(type === 'taxi_stand') {
      return 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/taxi-48.png';
    } else if(type === 'train_station') {
      return 'https://cdn3.iconfinder.com/data/icons/landscape-1/402/33-48.png';
    } else if(type === 'transit_station') {
      return 'https://cdn4.iconfinder.com/data/icons/travel-1-7/151/37-48.png';
    } else if(type === 'zoo') {
      return 'https://cdn0.iconfinder.com/data/icons/animal-icons-flat/128/tiger-48.png';
    } else {
      return 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-48.png';
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
        position={this.props.marker.geometry.location}
        // label={{text: this.props.marker.name, color: 'dark gray', fontStyle: 'roboto'}}
        icon={resultIcon}
        opacity={0.9}
        onMouseOver={() => this.onToggleOpen()}
        onMouseOut={() => this.onToggleOpen()}
        // onClick={() => this.onToggleOpen()}
        // labelStyle={{ fontSize: '10px', padding: '15px', opacity: 0.50 }}
      >
          {this.props.index === this.props.clicked&&(
          <InfoWindow>
            <div className='clicked-marker-info'>
              {/* {this.markerImage(this.props.marker.photos)} */}
              <img className='clicked-marker-icon' src={this.markerImage(this.props.marker.types[0])} alt=''/>
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
              {/* <img src={this.markerImage(this.props.marker.types[0])} alt=''/> */}
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
    clicked: state.result.open
  }
};

export default connect(mapStateToProps)(PlaceMarker);