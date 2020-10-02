import React, { Component } from 'react';
import './RestaurantModify.css';
import axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class RestaurantModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            city: "", state: "", long: "", lat: "",
            phone_number: "",
            is_dine_in_possible: false,
            is_pickup_possible: false,
            is_delivery_possible: false,
            errorMessage: ""
        }

        this.pickupChangeHandler = this.pickupChangeHandler.bind(this);
        this.dineinChangeHandler = this.dineinChangeHandler.bind(this);
        this.deliveryChangeHandler = this.deliveryChangeHandler.bind(this);

        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.longChangeHandler = this.longChangeHandler.bind(this);
        this.latChangeHandler = this.latChangeHandler.bind(this);
        this.phone_numberChangeHandler = this.phone_numberChangeHandler.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
    }

    componentWillMount() {
        // // Triggered when refresh
        // if (this.props.user.email === "" && this.props.user.password === "") {
        //     console.log("Reload state from local Storage !");
        //     let userProfile = localStorage.getItem("user_profile");
        //     this.props.renderToProfile(JSON.parse(userProfile));
        //     console.log("Reloaded object is", userProfile);
        // }

        this.setState({
            is_dine_in_possible: false,
            is_pickup_possible: false,
            is_delivery_possible: false
        });

        console.log("User profile = ", this.props.user);
        console.log("Profile Update page state = ", this.state);
    }

    pickupChangeHandler = (e) => {
        this.setState({
            is_pickup_possible: !this.state.is_pickup_possible
        })
    }

    dineinChangeHandler = (e) => {
        this.setState({
            is_dine_in_possible: !this.state.is_dine_in_possible
        })
    }

    deliveryChangeHandler = (e) => {
        this.setState({
            is_delivery_possible: !this.state.is_delivery_possible
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
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
            long: e.target.value
        })
    }

    latChangeHandler = (e) => {
        this.setState({
            lat: e.target.value
        })
    }

    phone_numberChangeHandler = (e) => {
        this.setState({
            phone_number: e.target.value
        })
    }

    //submit Update handler to send a request to the node backend
    submitUpdate = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {};
        for (const key in this.state) {
            const user_input = this.state[key];
            console.log("@@@@", key, user_input);
            // If user enters nothing, then don't put it

            if (key === "errorMessage") {
                continue;
            }

            if (typeof (user_input) == "string" && !user_input.replace(/\s/g, '')) {
                console.log("!!");
                continue;
            }

            data[key] = user_input;

            const changedState = {}
            changedState[key] = ""
            this.setState(changedState);
        }

        console.log("Restaurant update data = ", data);
        console.log("Current state = ", this.state);

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        if (Object.keys(data).length > 0) {
            axios.put(`http://localhost:3001/restaurants/${this.props.restaurantUser["res_pk"]}`, data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    // console.log(response.data);
                    if (response.status === 200) {
                        this.props.renderToRestaurantProfile(data);
                        console.log("Current user at update page = ", this.props.restaurantUser);
                        localStorage.setItem("restaurant_profile", JSON.stringify(this.props.restaurantUser));
                        this.props.history.push("/restaurantProfile");
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
        } else {
            alert("You must enter at least one of the fields !");
        }
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        // TODO: split below into container and component
        document.title = " [ Modify Profile ] "
        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="modify-container">
                    <h1> Update Your Profile !</h1>
                    <div>
                        <div class="row">
                            <p>The Name Of Your Restaurant</p>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.nameChangeHandler} type="text" name="name" placeholder="Name" value={this.state.name} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="row">
                            <p>Your Address: City, State</p>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.cityChangeHandler} type="text" name="city" placeholder="City" value={this.state.city} required />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.stateChangeHandler} type="text" name="state" placeholder="State" value={this.state.state} required />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <p>Update Delivery Mode</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="row">
                            <p>Your updated longitude and latitude</p>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.longChangeHandler} type="text" name="long" placeholder="Longitude" value={this.state.long} required />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.latChangeHandler} type="text" name="lat" placeholder="Latitude" value={this.state.lat} required />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.is_dine_in_possible}
                                        onChange={this.dineinChangeHandler} />
                                    <p class="filter-checkbox">Dine in</p>
                                </label>
                                <br></br>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.is_delivery_possible}
                                        onChange={this.deliveryChangeHandler} />
                                    <p class="filter-checkbox">Delivery</p>
                                </label>
                                <br></br>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.is_pickup_possible}
                                        onChange={this.pickupChangeHandler} />
                                    <p class="filter-checkbox">Pick Up</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="row">
                            <p>Your phone number</p>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <input onChange={this.phone_numberChangeHandler} type="text" name="phone_number" placeholder="Your updated number" value={this.state.phone_number} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-container">
                    <button onClick={this.submitUpdate} class="btn btn-primary modify-btn">Update</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        restaurantUser: state.restaurantUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToRestaurantProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_RESTAURANT_PROFILE, payload: payload }),
        flushRestaurantProfile: () => dispatch({ type: actionTypes.FLUSH_RESTAURANT_PROFILE })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModify);
