import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
import DollarSign from '../images/price-tag.png'

const style = {
  width:'10px',
  height:'10px'
}

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
  
  priceLevel(priceTag){
    if(priceTag === 1){
      return(
        <img  style={style} src={DollarSign} alt={"dollar signs"} />
      )
    }
    else if(priceTag === 2){
      return(
        <img  style={style} src={DollarSign} alt={"dollar signs"} />
      )
    }
    else if(priceTag === 3){
      return(
        <img  style={style} src={DollarSign} alt={"dollar signs"} />
      )
    }
    else if(priceTag === 4){
      return(
        <img  style={style} src={DollarSign} alt={"dollar signs"} />
      )
    }
    else{
      console.log(`this is not working ${priceTag}` )
    }
  }

  render() {
    let rating = this.props.marker.rating;
    let newPrice =  this.props.marker.price_level ;
    return(
      <Marker
        key={this.props.index}
        position={this.props.marker.geometry.location}
        onClick={() => this.onToggleOpen()}
        // labelStyle={{ fontSize: '10px', padding: '15px', opacity: 0.50 }}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={() => this.onToggleOpen()}>
            <div className='marker-info'>
              <h1 className='marker-header'>
                {this.props.marker.name} <br/>
              </h1>
              <p className={'marker-extra-info'}>
                Rating:{this.props.marker.rating}<br/>
                Price Level:{this.props.marker.price_level}<br/>
                {this.priceLevel(newPrice)}
                {/* <img  className={'marker-info-icon'}src={this.props.marker.icon} alt={'place icon'} /> */}
              </p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
};