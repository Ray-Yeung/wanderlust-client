import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';


export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
<<<<<<< HEAD
        <div className="header">
            <h2>Welcome to Wanderlust</h2>
            </div>
=======
>>>>>>> f8523a3a9a70a2f930166fddc054ab4292382de9
            <LoginForm />
            <Link to="/register">Register</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
