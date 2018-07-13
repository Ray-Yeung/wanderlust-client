import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';

import Search from './search-input';
import Results from './results';
import Trips from './trips';
import {GOOGLE_API_KEY} from '../config';
// import Map from './map';
import GoogleMapWrapper from './googleMapWrapper';
import '../css/dashboard.css'

import { toggleResults, toggleTrips } from '../actions/results';


export class Dashboard extends React.Component {
    componentDidMount() {
        // this.props.dispatch(fetchProtectedData());
    }

    
    render() {
        // console.log(this.props.name)
        // console.log(this.props.currentUser)

        let highlightResults = "";
        let highlightTrips = "";
        
        let mapPosition = "";

        if (this.props.displayResults) {
            highlightResults = "highlight-buttons";
            mapPosition = "map-right";
        }
        if (this.props.displayTrips) {
            highlightTrips = "highlight-buttons";
            mapPosition = "map-left";
        }
        return (
            <div className="dashboard">
            <header className={'dash-header'}>
            <h1 className={"dash-name"}>Wanderlust</h1>
            <div className="arrow-holder"><div className="expand-arrow"></div></div>
                </header>

                <Search />
                <div className={mapPosition}>
                <GoogleMapWrapper />
                </div>
                <Trips />
                <Results />
                <div className="result-trips-footer">
                    <div className="expand-btns">
                        <button className={`expand-results ${highlightResults}`} 
                            onClick={() => {
                                this.props.dispatch(toggleResults());
                                }}>
                            Results
                        </button>
                        <button className={`expand-trips ${highlightTrips}`}
                            onClick={() => {
                                this.props.dispatch(toggleTrips());
                                }}>
                            Trips
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    // console.log(currentUser)
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstname} ${currentUser.lastname}`,
        protectedData: state.protectedData.data,
        displayResults: state.result.toggleResults,
        displayTrips: state.result.toggleTrips
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
