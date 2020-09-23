import React, { Component } from 'react';
// import './UserLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//Define a Login Component
class RestaurantList extends Component {
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

        let errorMessageVar = null;
        if (this.state.errorMessage !== "") {
            errorMessageVar = (
                <h5 class="error">{this.state.errorMessage}</h5>
            )
        }

        return (
            <div>
                {redirectVar}
                <h1>Implement your restaurant list here !</h1>
            </div>
        )
    }
}
//export Login Component
export default RestaurantList;
