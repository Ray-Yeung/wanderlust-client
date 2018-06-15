import React from 'react';
import {connect} from 'react-redux';
import { openMoreDetails, closeMoreDetails } from '../actions/results';

class Results extends React.Component {
    clicked(inc) {
        if (inc === this.props.clicked) {
            this.props.dispatch(closeMoreDetails());
        }
        else {
            this.props.dispatch(openMoreDetails(inc));
        }
    }

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
            if (inc === Number(this.props.clicked) && this.props.clicked !== false) {
                dynamicHeight = '300px'
                details = 
                <div>
                    <div>
                        Open: {result.opening_hours.open_now ? 'true' : 'false'}
                    </div>
                    <div>
                        Rating: {result.rating}
                    </div>
                </div>
            }
            // keep box regular size
            else {
                dynamicHeight = '100px'
                details = null;
            }
            return (
                <div 
                key={inc} 
                id={inc} 
                style={{innerWidth: '300px', height: dynamicHeight, border: 'solid 1px black'}} 
                onClick={() => this.clicked(inc)}
                >
                    {result.name}
                    {details}
                </div>
                )
            });
        }
        return (
            <div>
                {list}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        results: state.protectedData.results,
        clicked: state.result.open
    }
};

export default connect(mapStateToProps)(Results)