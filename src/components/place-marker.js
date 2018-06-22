import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import DollarSign from '../images/price-tag.png'
import resultIcon from '../icons/resultIcon';

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
      return;
    }
  }

  render() {
    // let rating = this.props.marker.rating;
    let newPrice =  this.props.marker.price_level ;
    return(
      <Marker
        key={this.props.index}
        position={this.props.marker.geometry.location}
        label={{text: this.props.marker.name, color: 'dark gray', fontStyle: 'roboto'}}
        icon={resultIcon}
        opacity={0.9}
        onMouseOver={() => this.onToggleOpen()}
        onMouseOut={() => this.onToggleOpen()}
        // onClick={() => getPosition()}
        // labelStyle={{ fontSize: '10px', padding: '15px', opacity: 0.50 }}
      >
        {this.state.isOpen && (
          <InfoWindow onClick={() => this.onToggleOpen()}>
            <div className='marker-info'>
              <h1 className='marker-header'>
                {this.props.marker.name} <br/>
              </h1>
              <p className={'marker-extra-info'}>
                Rating:{this.props.marker.rating}<br/>
                Price Level:{this.props.marker.price_level}<br/>
                {this.priceLevel(newPrice)}
              </p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
};