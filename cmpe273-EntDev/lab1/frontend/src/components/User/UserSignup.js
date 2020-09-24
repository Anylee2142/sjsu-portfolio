import React, { Component } from 'react';
import './UserSignup.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

//Define a Login Component
class UserSignup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            emailID: "",
            password: "",
            authFlag: false,
            errorMessage: ""
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailIDChangeHandler = this.emailIDChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
        console.log("User state = ", this.props.user);
        console.log("Local Storage = ", localStorage.getItem("user_profile"));
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
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name: this.state.name,
            emailID: this.state.emailID,
            password: this.state.password
        };
        this.setState({
            name: "",
            emailID: "",
            password: ""
        });
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.put('http://localhost:3001/user', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                    let signUp_cache = {
                        "name": data.name,
                        "email": data.emailID,
                        "password": data.password
                    }
                    this.props.renderToProfile(signUp_cache);
                    localStorage.setItem("user_profile", JSON.stringify(signUp_cache));
                    this.props.history.push("/restaurantList");
                }

            }).catch((error) => {
                console.log("Error has been catched : ", error.response.status);
                console.log(error.response);
                console.log("Error response data = ", error.response.data);
                if (true) { // When couldn't find user
                    this.setState({
                        authFlag: false,
                        errorMessage: error.response.data
                    })
                }
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (cookie.load('cookie')) {
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
                                <h2>Yelp Signup</h2>
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
    console.log(state);
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({type: actionTypes.RENDER_TO_PROFILE, payload: payload}),
        flushUser: () => dispatch({type: actionTypes.FLUSH_USER})
        // onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        // onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        // onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
        // onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        // onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        // onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    }
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);