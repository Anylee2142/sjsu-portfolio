import React, { Component } from 'react';
import './RestaurantDetail.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class RestaurantDetail extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            restaurant: this.props.location.state.restaurant,
            menus: [],
            YES_SIGN: "O",
            NO_SIGN: "X",
            render: false
        }
    }

    componentWillMount() {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/menus/${this.state.restaurant.res_pk}`)
            .then(response => {
                console.log("Fetched Menus detail = ", response.data);
                this.setState({
                    menus: response.data
                });
                console.log("Chaning Local State Finished !");
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

    componentDidMount() {
        // Put a little bit of delay so that it won't always display "no display" at the first blink
        setTimeout(function () {
            this.setState({
                render: true,
            })
        }.bind(this), 200)
    }

    render() {
        console.log(this.state);
        console.log(this.props);

        var menuVar = "";
        if (this.state.render) {
            menuVar = (
                <div class="restaurant-body-content-menu">
                    <div class="restaurant-body-content-menu-detail">
                        <p>{(this.state.menus.length >= 1) ? this.state.menus[0].name : ""}</p>
                        <p>{(this.state.menus.length >= 1) ? "$ " + this.state.menus[0].price : ""}</p>
                    </div>
                    <div class="restaurant-body-content-menu-detail">
                        <p>{(this.state.menus.length >= 2) ? this.state.menus[1].name : ""}</p>
                        <p>{(this.state.menus.length >= 2) ? "$ " + this.state.menus[1].price : ""}</p>
                    </div>
                    <div class="restaurant-body-content-menu-detail">
                        <p>{(this.state.menus.length >= 3) ? this.state.menus[2].name : ""}</p>
                        <p>{(this.state.menus.length >= 3) ? "$ " + this.state.menus[2].price : ""}</p>
                    </div>
                </div>
            );
        }

        document.title = "[ Restaurant Details ]"
        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="restaurant-header">YOUR CAROUSEL HERE</div>
                <div class="restaurant-body">
                    <div class="row">
                        <div class="col-lg-8 restaurant-body-content">
                            <h1 class="restaurant-detail-inliner">{this.state.restaurant.name}</h1>
                            <h2 class="restaurant-detail-inliner detail-go-right">[{this.state.restaurant.avg_rating} / 5.0]</h2>
                            <hr></hr>
                            <h2>Restaurant Description</h2>
                            <div class="restaurant-body-content-desc">
                                {this.state.restaurant.res_desc}
                            </div>

                            <h2>Popular Dishes</h2>
                            {menuVar}

                            <div clas="restaurant-body-content-review">
                                <h2 class="restaurant-detail-inliner">Your Review! </h2>
                                <button type="submit" class="btn btn-default review-submit-btn" onClick={this.submitSearch}>
                                    <span class="button-style">Submit!</span>
                                </button>
                                <div class="restaurant-body-content-review-yourinput">

                                </div>
                                <div class="restaurant-body-content-review-others">
                                    <div>qwer</div>
                                    <div>qwer</div>
                                    <div>qwer</div>
                                    <div>qwer</div>
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-4 restaurant-body-order">
                            <div class="restaurant-body-order-orderbutton">
                                <p>Order Online for Delivery!</p>
                                <button type="submit" class="btn btn-default order-btn" onClick={this.submitSearch}>
                                    <span class="button-style">Order!</span>
                                </button>
                            </div>
                            <div class="restaurant-body-order-info">
                                <h3>Food type: {this.state.restaurant.type_of_food}</h3>
                                Dine-in: [{this.state.restaurant.is_dine_in_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]
                                Delivery: [{this.state.restaurant.is_delivery_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]
                                Pickup: [{this.state.restaurant.is_pickup_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]
                                <hr></hr>
                                <p>{this.state.restaurant.state}, {this.state.restaurant.city}</p>
                                <hr></hr>
                                <p>{this.state.restaurant.email}</p>
                                <hr></hr>
                                <p>{this.state.restaurant.phone_number}</p>

                            </div>
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
        menu: state.menu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        renderToRestaurant: (payload) => dispatch({ type: actionTypes.RENDER_TO_RESTAURANT, payload: payload }),
        renderToGeolocation: (payload) => dispatch({ type: actionTypes.RENDER_TO_GEOLOCATION, payload: payload }),
        rednerToMenu: (payload) => dispatch({ type: actionTypes.RENDER_TO_MENU, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER }),
        flushSearch: () => dispatch({ type: actionTypes.FLUSH_SEARCH }),
        flushGeolocation: () => dispatch({ type: actionTypes.FLUSH_GEOLOCATION }),
        flushMenu: () => dispatch({ type: actionTypes.FLUSH_MENU })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail);
