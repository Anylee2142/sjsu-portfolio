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

            birdview: false,
            driving: false,
            biking: false,
            walking: false,
            within4: false,

            render: false
        }

        this.togglePickup = this.togglePickup.bind(this);
        this.toggleDinein = this.toggleDinein.bind(this);
        this.toggleDelivery = this.toggleDelivery.bind(this);
        this.toggleBirdview = this.toggleBirdview.bind(this);
        this.toggleDriving = this.toggleDriving.bind(this);
        this.toggleBiking = this.toggleBiking.bind(this);
        this.toggleWalking = this.toggleWalking.bind(this);
        this.toggleWithin4 = this.toggleWithin4.bind(this);
        this.isDeliveryFilterOff = this.isDeliveryFilterOff.bind(this);
        this.isNeighborFilterOff = this.isNeighborFilterOff.bind(this);
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

    toggleBirdview() {
        this.setState({
            birdview: !this.state.birdview,
            driving: false,
            biking: false,
            walking: false,
            within4: false,
        })
    }

    toggleDriving() {
        this.setState({
            birdview: false,
            driving: !this.state.driving,
            biking: false,
            walking: false,
            within4: false,
        })
    }

    toggleBiking() {
        this.setState({
            birdview: false,
            driving: false,
            biking: !this.state.biking,
            walking: false,
            within4: false,
        })
    }

    toggleWalking() {
        this.setState({
            birdview: false,
            driving: false,
            biking: false,
            walking: !this.state.walking,
            within4: false,
        })
    }

    toggleWithin4() {
        this.setState({
            birdview: false,
            driving: false,
            biking: false,
            walking: false,
            within4: !this.state.within4,
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

    isDeliveryFilterOff() {
        return (!this.state.pickup && !this.state.dinein && !this.state.delivery);
    }

    isNeighborFilterOff() {
        return (!this.state.birdview && !this.state.driving && !this.state.biking && !this.state.walking && !this.state.within4);
    }

    render() {
        var imageURL = "https://www.thesprucepets.com/thmb/bH92K8TCfifpML07q5-typkH4HM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1024px-Bulldog_inglese-cf544d354159462c8c0d93db5f1adbe6.jpg"
        document.title = "Find restaurant !"

        var restaurants = null;
        var restaurantsVar = null;

        console.log(this.state);
        console.log(this.props);

        if (this.state.render) {
            // restaurants = (!this.props.restaurant.restaurants) ? this.state.restaurants : this.props.restaurant.restaurants;
            restaurants = this.props.restaurant.restaurants;
            // If no filter
            if (this.isDeliveryFilterOff() && this.isNeighborFilterOff()) {
                restaurants = this.props.restaurant.restaurants;
            } else { // If filter set
                // Delivery filter
                if (!this.isDeliveryFilterOff()) {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    restaurants = this.props.restaurant.restaurants.filter(restaurant => {
                        return (restaurant.is_pickup_possible == this.state.pickup)
                        || (restaurant.is_dine_in_possible == this.state.dinein)
                        || (restaurant.is_delivery_possible == this.state.delivery)
                    });
                }
                // Neighbor filter
                if (!this.isNeighborFilterOff()) {
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2")
                    console.log(this.state);
                    // if 0 < math.sqrt(long_delta**2 + lat_delta**2) < 0.006 -> within 4 blocks
                    // 0.006 < the_value < 0.012 -> walking
                    // 0.012 < the_value < 0.018 -> biking
                    // 0.018 < the_value < 0.024 -> driving
                    // 0.024 < the_value < 0.050 -> birdview

                    let my_long = this.props.geolocation.long;
                    let my_lat = this.props.geolocation.lat;

                    let lower_bound = -1;
                    let upper_bound = -1;
                    if (this.state.within4) {
                        lower_bound = 0;
                        upper_bound = 0.006;
                    } else if (this.state.walking) {
                        lower_bound = 0.006;
                        upper_bound = 0.012;
                    } else if (this.state.biking) {
                        lower_bound = 0.012;
                        upper_bound = 0.018;
                    } else if (this.state.driving) {
                        lower_bound = 0.018;
                        upper_bound = 0.024;
                    } else if (this.state.birdview) {
                        lower_bound = 0.024;
                        upper_bound = 0.100;
                    }
                    console.log("STandrads = ", lower_bound, upper_bound);

                    restaurants = this.props.restaurant.restaurants.filter(restaurant => {
                        const long_delta = (my_long - restaurant.res_long)**2;
                        const lat_delta = (my_lat - restaurant.res_lat)**2;
                        const total_delta = Math.sqrt(long_delta + lat_delta);
                        
                        console.log("RES NAME = ", restaurant.name, total_delta);
                        
                        if ((lower_bound <= total_delta) && (total_delta < upper_bound)) {
                            return true
                        }
                        return false
                    });
                }
                
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
                                        checked={this.state.birdview}
                                        onChange={this.toggleBirdview} />
                                    <p class="filter-checkbox">Bird Eye View</p>

                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.driving}
                                        onChange={this.toggleDriving} />
                                    <p class="filter-checkbox">Driving (5 mi.)</p>

                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.biking}
                                        onChange={this.toggleBiking} />
                                    <p class="filter-checkbox">Biking (2 mi.)</p>
                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.walking}
                                        onChange={this.toggleWalking} />
                                    <p class="filter-checkbox">Walking (1 mi.)</p>
                                </label>
                                <label>
                                    <input type="checkbox" class="filter-square"
                                        checked={this.state.within4}
                                        onChange={this.toggleWithin4} />
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
        restaurant: state.restaurant,
        geolocation: state.geolocation
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        renderToRestaurant: (payload) => dispatch({ type: actionTypes.RENDER_TO_RESTAURANT, payload: payload }),
        renderToGeolocation: (payload) => dispatch({ type: actionTypes.RENDER_TO_GEOLOCATION, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER }),
        flushSearch: () => dispatch({ type: actionTypes.FLUSH_SEARCH }),
        flushGeolocation: () => dispatch({ type: actionTypes.FLUSH_GEOLOCATION }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
