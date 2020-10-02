import React, { Component } from 'react';
import './RestaurantSignup.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

//Define a Login Component
class RestaurantSignup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            emailID: "",
            password: "",
            city: "", state: "",
            res_long: "", res_lat: "",
            // authFlag: false,
            errorMessage: ""
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailIDChangeHandler = this.emailIDChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.longChangeHandler = this.longChangeHandler.bind(this);
        this.latChangeHandler = this.latChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        // this.setState({
        //     authFlag: false
        // })
        console.log("User state = ", this.props.restaurantUser);
        console.log("Local Storage = ", localStorage.getItem("restaurant_profile"));
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    //username change handler to update state variable with the text entered by the user
    emailIDChangeHandler = (e) => {
        this.setState({
            emailID: e.target.value
        })
    }

    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }

    longChangeHandler = (e) => {
        this.setState({
            res_long: e.target.value
        })
    }

    latChangeHandler = (e) => {
        this.setState({
            res_lat: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name: this.state.name,
            emailID: this.state.emailID,
            password: this.state.password,
            city: this.state.city, state: this.state.state,
            res_long: this.state.res_long, res_lat: this.state.res_lat
        };
        this.setState({
            name: "",
            emailID: "",
            password: "",
            city: "", state: "",
            res_long: "", res_lat: ""
        });
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/restaurants/', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    let signUp_cache = {
                        "name": data.name,
                        "email": data.emailID,
                        "password": data.password
                    }
                    this.props.renderToRestaurantProfile(signUp_cache);
                    localStorage.setItem("restaurant_profile", JSON.stringify(signUp_cache));
                    this.props.history.push("/restaurantList");
                }

            }).catch((error) => {
                console.log("Error has been catched : ", error.response.status);
                console.log(error.response);
                console.log("Error response data = ", error.response.data);
                if (true) { // When couldn't find user
                    this.setState({
                        errorMessage: error.response.data
                    })
                }
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('restaurantCookie')) {
            redirectVar = <Redirect to="/restaurantList" />
        } 

        let errorMessageVar = null;
        if (this.state.errorMessage !== "") {
            errorMessageVar = (
                <h5 class="error">{this.state.errorMessage}</h5>
            )
        }

        document.title = "Sign up - Yelp"
        return (
            <div>
                {redirectVar}
                <div class="red-header">Yelp !</div>
                <div class="signup-container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Yelp Restaurant Signup</h2>
                                {errorMessageVar}
                                Please enter your Name, Email ID, and Password
                            </div>
                            <div class="form-group">
                                <input onChange={this.nameChangeHandler} type="text" name="name" placeholder="Name" value={this.state.name} required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.emailIDChangeHandler} type="email" name="emailID" placeholder="Email ID" value={this.state.emailID} required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" name="password" placeholder="Password" value={this.state.password} required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.cityChangeHandler} type="text" name="city" placeholder="City" value={this.state.city} required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.stateChangeHandler} type="text" name="state" placeholder="State" value={this.state.state} required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.longChangeHandler} type="test" name="longitude" placeholder="Longitude" value={this.state.res_long} required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.latChangeHandler} type="text" name="latitude" placeholder="Latitude" value={this.state.res_lat} required />
                            </div>
                            <button onClick={this.submitLogin} class="btn btn-primary">Login</button>
                        </div>
                    </div>
                    <div class="logo">
                        <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"></img>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        restaurantUser: state.restaurantUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToRestaurantProfile: (payload) => dispatch({type: actionTypes.RENDER_TO_RESTAURANT_PROFILE, payload: payload}),
        flushRestaurantProfile: () => dispatch({type: actionTypes.FLUSH_RESTAURANT_PROFILE})
    }
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSignup);