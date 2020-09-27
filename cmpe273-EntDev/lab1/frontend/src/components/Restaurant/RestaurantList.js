import React, { Component, useEffect } from 'react';
import './RestaurantList.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

class RestaurantList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            YES_SIGN: "O",
            NO_SIGN: "X",
            pickup: false,
            dinein: false,
            delivery: false,
            render: false
        }

        this.togglePickup = this.togglePickup.bind(this);
        this.toggleDinein = this.toggleDinein.bind(this);
        this.toggleDelivery = this.toggleDelivery.bind(this);
    }

    componentWillMount() {
        this.setState({
            pickup: false, dinein: false, delivery: false
        })
    }

    togglePickup() {
        this.setState({
            pickup: !this.state.pickup
        })
    }

    toggleDinein() {
        this.setState({
            dinein: !this.state.dinein
        })
    }

    toggleDelivery() {
        this.setState({
            delivery: !this.state.delivery
        })
    }

    componentDidMount() {
        // Put a little bit of delay so that it won't always display "no display" at the first blink
        setTimeout(function () {
            this.setState({
                render: true,
            })
        }.bind(this), 50)
    }

    render() {
        var imageURL = "https://www.thesprucepets.com/thmb/bH92K8TCfifpML07q5-typkH4HM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1024px-Bulldog_inglese-cf544d354159462c8c0d93db5f1adbe6.jpg"
        document.title = "Find restaurant !"

        var restaurants = null;
        var restaurantsVar = null;

        // console.log(this.state);

        if (this.state.render) {
            // restaurants = (!this.props.restaurant.restaurants) ? this.state.restaurants : this.props.restaurant.restaurants;
            
            // If no filter
            if (!this.state.pickup && !this.state.dinein && !this.state.delivery) {
                restaurants = this.props.restaurant.restaurants;
            } else { // filter
                restaurants = this.props.restaurant.restaurants.filter(restaurant => {
                    return (restaurant.is_pickup_possible == this.state.pickup)
                    || (restaurant.is_dine_in_possible == this.state.dinein)
                    || (restaurant.is_delivery_possible == this.state.delivery)
                });
            }

            if (restaurants.length > 0) {
                restaurantsVar = (
                    restaurants.map(restaurant => (
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
                    ))
                );
            } else {
                console.log("##############################")
                restaurantsVar = (
                    <h1 class="no-result">No results !</h1>
                );
            }
        }

        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="res-container">
                    <div class="row">
                        <div class="col-lg-2 filter-config">
                            YOUR FILTER
                            <div class="delivery-config">
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.pickup}
                                        onChange={this.togglePickup} />
                                    <p class="filter-checkbox">Pick Up</p>

                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.dinein}
                                        onChange={this.toggleDinein} />
                                    <p class="filter-checkbox">Dine in</p>

                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.delivery}
                                        onChange={this.toggleDelivery} />
                                    <p class="filter-checkbox">Delivery</p>
                                </label>
                            </div>

                            <div class="neighbor-config">
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.pickup}
                                        onChange={this.togglePickup} />
                                    <p class="filter-checkbox">Bird Eye View</p>

                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.dinein}
                                        onChange={this.toggleDinein} />
                                    <p class="filter-checkbox">Driving (5 mi.)</p>

                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.delivery}
                                        onChange={this.toggleDelivery} />
                                    <p class="filter-checkbox">Biking (2 mi.)</p>
                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.delivery}
                                        onChange={this.toggleDelivery} />
                                    <p class="filter-checkbox">Walking (1 mi.)</p>
                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.delivery}
                                        onChange={this.toggleDelivery} />
                                    <p class="filter-checkbox">Within 4 blocks</p>
                                </label>
                            </div>
                        </div>
                        <div class="col-lg-6 res-list">
                            <h1>RESTAURANTS !</h1>
                            {restaurantsVar}
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        restaurant: state.restaurant
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        renderToRestaurant: (payload) => dispatch({ type: actionTypes.RENDER_TO_RESTAURANT, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER }),
        flushSearch: () => dispatch({ type: actionTypes.FLUSH_SEARCH })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
