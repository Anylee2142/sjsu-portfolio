import React, { Component } from 'react';
import './UserLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//Define a Login Component
class UserLogin extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailID: "",
            password: "",
            authFlag: false,
            errorMessage: ""
        }
        //Bind the handlers to this class
        this.emailIDChangeHandler = this.emailIDChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
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
            emailID: this.state.emailID,
            password: this.state.password
        };
        this.setState({
            emailID: "",
            password: ""
        });
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/user', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                }
            }).catch((error) => {
                console.log("Error has been catched : ", error.response.status);
                console.log(error.response);
                console.log("qerqwerqwer", error.response.data);
                if (error.response.status === 401) { // When couldn't find user
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

        return (
            <div>
                {redirectVar}
                <div class="red-header">Yelp !</div>
                <div class="login-container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Yelp Login</h2>
                                {errorMessageVar}
                                Please enter your Email ID and password
                            </div>
                            <div class="form-group">
                                <input onChange={this.emailIDChangeHandler} type="text" name="emailID" placeholder="Email ID" value={this.state.emailID} />
                            </div>
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" name="password" placeholder="Password" value={this.state.password} />
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
//export Login Component
export default UserLogin;
