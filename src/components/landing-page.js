import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Photo from '../images/Clippy.png'
import appPic1 from '../images/pic1.PNG'
import appPic2 from '../images/pic2.PNG'
import appPic3 from '../images/pic3.PNG'
import TripImg from '../images/trips.PNG'
import LoginForm from './login-form';
import {login} from '../actions/auth';
import '../css/landing.css'

import {loginClickedSuccess} from '../actions/protected-data';

const mainBg = {
    maxWith:"100%",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  export class LandingPage extends React.Component{
      constructor(){
          super()
      }
    // If we are logged in redirect straight to the user's dashboard
    
render(){
    let loggingIn = "";
    let btnName = "login / register";
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    if (this.props.loggingIn) {
        loggingIn = "loggingIn";
        btnName = "Cancel";
    }
    return (
        <div className="home">
            <h1 className={"header-name-shower"}>wanderLust</h1>
            <div className={`header-login ${loggingIn}`}>
                <button className="login-small" onClick={() => {
                    this.props.dispatch(loginClickedSuccess());
                }}>{`${btnName}`}</button>
                <button className="demo-small" onClick={() => {
                    if (this.props.loggingIn) {
                    this.props.dispatch(loginClickedSuccess());
                    }
                    this.props.dispatch(login("demoUser", "demoPassword123"));
                }}>demo</button>
                <button className="demo-lrg" onClick={() => {
                    if (this.props.loggingIn) {
                    this.props.dispatch(loginClickedSuccess());
                    }
                    this.props.dispatch(login("demoUser", "demoPassword123"));
                }}>demo</button>
                <LoginForm />
                <Link to="/register" className="landing-register-link">Register</Link>
            </div>
            <div className="info-bkg">
                <div className="info-box">
                    <section className="info-section">
                        <h2 className="info-header-1">Plan your next trip!</h2>
                        <p className="info-p-1">Wanderlust lets you build up trips with any location you desire</p>
                        <img className="app-image" src={appPic1} alt="creating a new trip"/>
                        <h2 className="info-header-2">Save top rated spots!</h2>
                        <p className="info-p-2">Our map and search utility makes it easy to find and save the coolest destinations</p>
                        <img className="app-image" src={appPic2} alt="adding a place to a trip"/>
                        <h2 className="info-header-3">Keep notes for your trips!</h2>
                        <p className="info-p-3">We know keeping track of everything can be a hassle, so we made it easy for you to remember your plans all in one spot</p>
                        <img className="app-image" src={appPic3} alt="looking at saved trip info"/>
                    </section>
                </div>
            </div>
        </div>
    );
}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loggingIn: state.protectedData.loggingIn
});

export default connect(mapStateToProps)(LandingPage);
