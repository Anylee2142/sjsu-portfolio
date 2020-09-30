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
        console.log("111111", this.props)
        console.log("222222", this.state)
        this.state = {
            restaurant: this.props.location.state.restaurant,
            menus: (this.props.location.state.menus) ? this.props.location.state.menus : [],
            reviews: (this.props.location.state.reviews) ? this.props.location.state.reviews : [],
            YES_SIGN: "O",
            NO_SIGN: "X",
            your_review: "",
            your_rating: 0,
            render: false
        }

        this.reviewChangeHandler = this.reviewChangeHandler.bind(this);
        this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
        this.submitReview = this.submitReview.bind(this);
    }

    componentWillMount() {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/menus/${this.state.restaurant.res_pk}`)
            .then(response => {
                console.log("Fetched Menus detail = ", response.data);
                this.setState({
                    menus: response.data
                })
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

        axios.get(`http://localhost:3001/reviews/${this.state.restaurant.res_pk}`)
            .then(response => {
                console.log("Fetched Reviews detail = ", response.data);
                this.setState({
                    reviews: response.data
                })
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
        }.bind(this), 500)
    }

    reviewChangeHandler = (e) => {
        this.setState({
            your_review: e.target.value
        })
    }

    ratingChangeHandler = (e) => {
        this.setState({
            your_rating: e.target.value
        })
    }

    submitReview = (e) => {
        e.preventDefault();
        // 1. Insert to DB
        // 2. Flush review and rating
        const data = {
            user_pk: this.props.user.user_pk,
            res_pk: this.state.restaurant.res_pk,
            content: this.state.your_review,
            rating: this.state.your_rating,
            post_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        this.setState({
            your_review: "",
            your_rating: 0
        })

        // axios.defaults.withCredentials = true;
        axios.post(`http://localhost:3001/reviews`, data)
            .then(response => {
                console.log("Response from reviews API = ", response.data);
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

        // And then reload !
        window.location.reload();
    }

    render() {
        console.log(this.state);
        console.log(this.props);

        var menuVar = "";
        var reviewVar = "";
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

            reviewVar = (
                this.state.reviews.map((review) => (
                    <div class="restaurant-body-content-review-others-detail">
                        <div class="row">
                            <div class="col-lg-3 others-detail">
                                <p>{review.name}</p>
                                <p>[{review.city}, {review.state}]</p>
                            </div>
                            <div class="col-lg-9 others-comment">
                                [ {review.rating} / 5.0 ]
                                {"   " + review.post_date.split("T")[0]}
                                <hr></hr>
                                {review.content}
                            </div>
                        </div>
                    </div>
                ))
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
                                <div class="go-right">Your rate
                                    <input onChange={this.ratingChangeHandler} type="number" name="rating" min="1" max="5" class="go-right" value={this.state.your_rating}></input>
                                </div>
                                <div class="restaurant-body-content-review-yourinput">
                                    <form>
                                        <textarea
                                            onChange={this.reviewChangeHandler}
                                            class="yourinput-text"
                                            value={this.state.your_review}
                                            placeholder="Let us know your thoughts !"
                                        ></textarea>
                                        <button type="submit" class="btn btn-default review-submit-btn" onClick={this.submitReview}>
                                            <span class="button-style">Submit!</span>
                                        </button>
                                    </form>
                                </div>

                                <div class="restaurant-body-content-review-others">
                                    {reviewVar}
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-4 restaurant-body-order">
                            <div class="restaurant-body-order-orderbutton">
                                <p>Order Online for Delivery!</p>
                                <Link to={
                                    {
                                        pathname: "/restaurantOrder",
                                        state: { 
                                            restaurant: this.state.restaurant,
                                            menus: this.state.menus 
                                        }
                                    }
                                }>
                                <button type="submit" class="btn btn-default order-btn" onClick={this.submitSearch}>
                                    {/* Go to order link */}
                                    <span class="button-style">Order!</span>
                                </button>
                                </Link>
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
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
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
