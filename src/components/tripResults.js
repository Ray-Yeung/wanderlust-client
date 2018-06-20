import React, {Component} from 'react';
import {connect} from 'react-redux';

class TripResults extends Component {

    render() {
        let results;
        if (this.props.results.length >= 1) {
            results = this.props.results.map((result, inc) => {
                return (
                    <div key={inc}>
                        {result.name}
                    </div>
                )
            })
        }
        return (
            <div>
                {results}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        results: state.protectedData.tripResults
    }
}

export default connect(mapStateToProps)(TripResults)