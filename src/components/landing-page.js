import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Photo from '../images/Clippy.png'
import Ballon from '../images/ballon.png'
import LoginForm from './login-form';
import '../css/landing.css'
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
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
        <h1 className={"header-name-shower"}>wanderLust</h1>
        <header className={"header-name"}>
            <h1>WanderLust</h1>
            </header>
        <div className="header-login">
            <LoginForm />
            <Link to="/register" className="landing-register-link">Register</Link>
        </div>
        <img className={"clippy-man"} src={Photo} />
        <img className={'hot-air-balloon'} src={Ballon} />
        <div>


            </div>
        </div>
    );
}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
