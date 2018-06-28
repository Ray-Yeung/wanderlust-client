import React, {Component} from 'react';
import {connect} from 'react-redux';
import { openTripPlaceMoreDetails, closeTripPlaceMoreDetails, fetchTripPlaceDetailsError, fetchTripPlaceDetailsSuccess } from '../actions/results';
import { setMarkerLocation, removePlace, openMarker, closeMarker, addCommentToPlace } from '../actions/protected-data';

class TripResults extends Component {

    clicked(inc) {
        if (inc === this.props.clicked) {
            this.props.dispatch(closeTripPlaceMoreDetails());
            this.props.dispatch(closeMarker());
        }
        else {
            this.props.dispatch(openTripPlaceMoreDetails(inc));
            this.props.dispatch(openMarker());
            try {
                this.props.dispatch(fetchTripPlaceDetailsSuccess(this.props.results[inc]));
                this.props.dispatch(setMarkerLocation(this.props.results[inc].location))
                console.log(this.props.results[inc])
            }
            catch(err) {
                this.props.dispatch(fetchTripPlaceDetailsError('Sorry something went wrong with grabbing that place!'));
            }
        }
    }

    // onSubmit(e) {
    //     e.preventDefault();
    //     this.props.dispatch(
    //         addComment(this.commentInput.value)
    //     );
    //     e.target.reset();
    // }

    render() {
        let dynamicHeight;
        let list;
        let details;
        if (this.props.results.length >= 1) {
        list = this.props.results.map((result, inc) => { 
            // make sure the 0 index isn't expanded
            if (this.props.clicked === false) {
                dynamicHeight = '100px'
            }
            // expand the clicked box, include details
            if (this.props.details !== null && inc === Number(this.props.clicked) && this.props.clicked !== false 
            // &&this.props.photo !== null
            ) {
                console.log(this.props.details)
                dynamicHeight = '300px'
                details = 
                <div className={'trips-class'}>
                    {!this.props.details.rating ? '':
                    (<div>
                        Rating: {this.props.details.rating}
                    </div>)}
                    {!this.props.details.price_level ? '' :
                        (<div>
                        Price Level: {this.props.details.price_level}
                        </div>)}
                    <div>
                        {this.props.details.formatted_address}    
                    </div>
                    <div>       {this.props.details.formatted_phone_number}
                    </div>
                    <a href={this.props.details.website} target="_blank">
                        {`${this.props.details.name} official website`}
                    </a>
                   <div>
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=${this.props.details.photos[0].photo_reference}&key=AIzaSyCVzd2XPl8f7NZk1PN03mzAC7aI1ybumLM`} alt={`${this.props.details.name}`} className="place-photo"/>
                        <span className={`${this.props.details.photos[0].html_attributions[0]}`}></span>
                    </div> 
                    {/* render comments */}
                    {!this.props.details.comments[0] ? 'No comments' :
                        (<div>
                        <h2> Comments: </h2>
                        <ul>
                        {this.props.details.comments.map((comment, index) => {
                            return <li 
                            key={comment.id}>
                        <p>{comment.comment}</p>
                        <div>{comment.created}</div>
                        </li>
                        })
                        }
                        </ul>
                        </div>)}
                    <form >
                        <label htmlFor="comment">Add comment:</label>
                        <textarea
                            id="comment"
                            ref={input => (this.commentInput = input)}
                            onClick={e => {
                                e.stopPropagation();
                                
                            }}
                        />
                        <button
                        onSubmit={e => {
                            e.stopPropagation();
                            console.log(this.details.id, this.commentInput.value)
                                    this.props.dispatch(addCommentToPlace(this.details.id, this.commentInput.value));
                            }}>Submit</button>
                    </form>
                    <div className="button-placement">
                        <button className={'delete-button'} onClick={(e) => { 
                            e.stopPropagation();
                            // console.log('clicked')
                            if (window.confirm(`Are you sure you want to delete ${this.props.results[inc].name}?`)) this.props.dispatch(removePlace(this.props.results[inc].id))
                        }}>delete place</button>
                    </div>
                    {/* <div className="button-placement">
                        <button className={'comment-button'} onClick={(e) => { 
                            e.stopPropagation();
                            // console.log('clicked')
                            
                        }}>add comment</button>
                    </div> */}
                </div>
            }
            // keep box regular size
            else {
                dynamicHeight = '100px'
                details = null;
            }
            return (
                <div 
                className="listed-trips"
                key={inc} 
                id={inc} 
                // style={{width: '40%', innerWidth: '300px', height: dynamicHeight, border: 'solid 1px black'}} 
                onClick={(e) => {
                    e.stopPropagation();
                    this.clicked(inc)
                }}
                >
                    <div>{result.name}</div>
                    <div>{result.types[0]}</div>
                    {details}
                </div>
                )
            });
        }
        return (
            <div
            className='trips-item'>
                {list}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        results: state.protectedData.tripResults,
        details: state.result.tripPlaceDetails,
        clicked: state.result.tripPlaceOpen
    }
}

export default connect(mapStateToProps)(TripResults)