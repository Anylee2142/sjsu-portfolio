import React, { Component } from 'react';
import './RestaurantList.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

class RestaurantList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            isDineinPossible: false,
            isPickupPossible: false,
            isDeliveryPossible: false,
            YES_SIGN: "O",
            NO_SIGN: "X"
        }

    }

    componentWillMount() {
        // // Triggered when refresh
        // if (this.props.user.email === "" && this.props.user.password === "") {
        //     console.log("Reload state from local Storage !");
        //     let userProfile = localStorage.getItem("user_profile");
        //     this.props.renderToProfile(JSON.parse(userProfile));
        //     console.log("Reloaded object is", userProfile);
        // }

        // Connect DB to fetch restaurants
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/restaurants")
            .then(response => {
                this.setState({
                    restaurants: response.data,
                    isDineinPossible: response.data
                });
                console.log("Loaded Restaurants = ", this.state.restaurants);
            }).catch(error => {
                console.log("Error has been catched : ", error.response.status);
                console.log(error.response);
                console.log("Error response data = ", error.response.data);
                if (true) {
                    this.setState({
                        errorMessage: error.response.data
                    })
                }
            });

    }

    render() {
        var imageURL = "https://www.thesprucepets.com/thmb/bH92K8TCfifpML07q5-typkH4HM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1024px-Bulldog_inglese-cf544d354159462c8c0d93db5f1adbe6.jpg"
        document.title = "Find restaurant !"

        return (
            <div>
                <Navbar></Navbar>
                <div class="res-container">
                    <div class="row">
                        <div class="col-lg-2 filter-config">
                            YOUR FILTER
                        <div>

                            </div>
                        </div>
                        <div class="col-lg-6 res-list">
                            <h1>RESTAURANTS !</h1>
                            {this.state.restaurants.map(restaurant => (
                                <div class="res-spec">
                                    {/* <img class="res-image" src={imageURL}></img> */}
                                    <div class="res-content">
                                        <div class="res-image-container"><img class="res-image" src={imageURL}></img></div>
                                        <h2 class="res-inline">{restaurant.name}</h2>
                                        <h2 class="res-inline inline-go-right">{restaurant.phone_number}</h2>
                                        <br></br>
                                        <p class="p-inline inline-go-right">{restaurant.city}, {restaurant.state}</p>
                                        <p class="p-inline">{restaurant.avg_rating} / 5.0</p>
                                        <p>{restaurant.type_of_food}</p>
                                        {/* Location, contact information */}
                                        <p class="delivery-spec">
                                            Dine-in: [{restaurant.is_dine_in_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]
                                        Delivery: [{restaurant.is_delivery_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]
                                        Pickup: [{restaurant.is_pickup_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]</p>
                                    </div>
                                    <div class="res-description">
                                        <p>{restaurant.res_desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div class="col-lg-4 api-map">
                            YOUR GOOGLE MAP API HERE
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);