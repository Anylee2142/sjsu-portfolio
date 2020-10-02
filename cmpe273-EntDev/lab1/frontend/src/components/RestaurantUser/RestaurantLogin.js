import React, { Component } from 'react';
import './RestaurantLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


//Define a Login Component
class RestaurantLogin extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailID: "",
            password: "",
            // authFlag: false,
            errorMessage: ""
        }
        //Bind the handlers to this class
        this.emailIDChangeHandler = this.emailIDChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        // this.setState({
        //     authFlag: false
        // })

        // // Triggered when refresh
        // if (this.props.user.email==="" && this.props.user.password==="") {
        //     console.log("Reload state from local Storage !");
        //     let userProfile = JSON.parse(localStorage.getItem("user_profile"));
        //     this.props.renderToProfile(userProfile);
        //     console.log("Reloaded object is", userProfile);
        // }

        console.log("Restaurant User state = ", this.props.restaurantUser);
        console.log("Local Storage = ", localStorage.getItem("restaurant_profile"));
        console.log("Restaurant User login local state = ", this.state);
    }

    componentDidMount() {
        console.log("after mount = ", this.props.restaurantUser);
        if (this.props.restaurantUser.email !== "" && this.props.restaurantUser.password !== "") {
            this.setState({
                emailID: this.props.restaurantUser.email,
                password: this.props.restaurantUser.password
            })
        }
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
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        // var headers = new Headers();
        
        //prevent page from refresh
        e.preventDefault();
        const data = {
            emailID: this.state.emailID,
            password: this.state.password
        };
        this.setState({
            emailID: "",
            password: ""
        });
        console.log("Current login state before sending request = ", this.state);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/restaurants/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                // console.log(response.data);
                if (response.status === 200) {
                    this.props.renderToRestaurantProfile(response.data[0]);
                    localStorage.setItem("restaurant_profile", JSON.stringify(response.data[0]));
                    this.props.history.push("/home");
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
        if (cookie.load('userCookie')) {
            redirectVar = <Redirect to="/restaurantList" />
        }

        let errorMessageVar = null;
        if (this.state.errorMessage !== "") {
            errorMessageVar = (
                <h5 class="error">{this.state.errorMessage}</h5>
            )
        }

        document.title = "Log in - Yelp"
        return (
            <div>
                {redirectVar}
                <div class="red-header">Yelp !</div>
                <div class="login-container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Yelp RESTAURANT Login</h2>
                                {errorMessageVar}
                                Please enter your Email ID and password
                            </div>
                            <div class="form-group">
                                <input onChange={this.emailIDChangeHandler} type="email" name="emailID" placeholder="Email ID" value={this.state.emailID} required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" name="password" placeholder="Password" value={this.state.password} required />
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
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantLogin);
