import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import './RestaurantProfile.css';
import { NavLink, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';
import axios from 'axios';

//create the Navbar Component
class RestaurantProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
            menus: [],
            YES_SIGN: "O",
            NO_SIGN: "X",
            profile_picture: null,
            render: false
        }

        this.decodeCategoryCode = this.decodeCategoryCode.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    onFileChange = (e) => {
        this.setState({
            profile_picture: e.target.files[0]
        })
    }

    onFileUpload = (e) => {
        const data = new FormData();
        if (!this.state.profile_picture) {
            alert("Please proceed after uploading a picture !");
        }
        data.append('file', this.state.profile_picture);

        axios.post(`http://localhost:3001/images/restaurants/${this.props.restaurantUser.res_pk}`, data)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
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

    componentWillMount() {
        // Triggered when refresh
        if (this.props.restaurantUser.email === "" && this.props.restaurantUser.password === "") {
            console.log("Reload state from local Storage !");
            let restaurantUserProfile = localStorage.getItem("restaurant_profile");
            this.props.renderToProfile(JSON.parse(restaurantUserProfile));
            console.log("Reloaded object is", restaurantUserProfile);
        }

        console.log("Restaurant User profile = ", this.props);
    }

    componentDidMount() {
        // Put a little bit of delay so that it won't always display "no display" at the first blink
        setTimeout(function () {
            this.setState({
                render: true,
            })

            // loading from props slower than rendering, so that moved here with certain delay
            axios.defaults.withCredentials = true;
            axios.get(`http://localhost:3001/menus/${this.props.restaurantUser.res_pk}`)
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
            axios.get(`http://localhost:3001/reviews/${this.props.restaurantUser.res_pk}`)
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
        }.bind(this), 500)
    }

    decodeCategoryCode(categoryCode) {
        // Appetizer, Salads, Main Dish, Desserts, and Beverages from 0 to 4 respectively
        let category = "Not designated yet";
        if (categoryCode === 0) category = "Appetizer";
        if (categoryCode === 1) category = "Salads";
        if (categoryCode === 2) category = "Main Dish";
        if (categoryCode === 3) category = "Desserts";
        if (categoryCode === 4) category = "Beverages";
        return "Category : " + category;
    }

    // TODO: text generator here
    // if info, <p>{this.props.user.city}, {this.props.user.state}</p>
    // else, <p>No information yet !<p>

    render() {
        console.log("###", this.props);
        console.log(this.state);

        var profilePicURL = `http://localhost:3001/restaurant_${this.props.restaurantUser.res_pk}_profile.png`;
        var menusVar = null;
        var reviewsVar = null;
        if (this.state.render) {
            menusVar = (
                <div class="restaurant-profile-content-menu">
                    {this.state.menus.map((menu, idx) => (
                        <div class="restaurant-profile-content-menu-detail">
                            <p>{(this.state.menus.length >= 1) ? <Link to={
                                {
                                    pathname: "/restaurantEditMenu",
                                    state: { menu: menu }
                                }
                            }>{menu.name}</Link> : ""}</p>
                            <p>{(this.state.menus.length >= 1) ? "$ " + menu.price : "TBD"}</p>
                            <p>[{(this.state.menus.length >= 1) ? menu.ingredient : "TBD"}]</p>
                            <p>[{(this.state.menus.length >= 1) ? menu.menu_desc : "TBD"}]</p>
                            <p>[{(this.state.menus.length >= 1) ? this.decodeCategoryCode(menu.category) : "TBD"}]</p>
                        </div>
                    ))}
                </div>
            );

            reviewsVar = (
                <div class="restaurant-profile-content-review-others-detail">
                    {this.state.reviews.map((review) => (
                        <div class="row restaurant-profile-review-detail">
                            <div class="col-lg-3 restaurant-profile-others-detail">
                                <p>{review.name}</p>
                                <p>[{review.city}, {review.state}]</p>
                            </div>
                            <div class="col-lg-9 restaurant-profile-others-comment">
                                [ {review.rating} / 5.0 ]
                                {"   " + review.post_date.split("T")[0]}
                                <hr></hr>
                                {review.content}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }


        document.title = "Your Yelp Profile"
        return (
            <div>
                <Navbar {...this.props}></Navbar>

                <div class="header container">
                    <div class="user-profile-picture">
                        <img src={profilePicURL}></img>
                    </div>
                    <div class="brief-summary">
                        <h1>{this.props.restaurantUser.name} [{(!this.props.restaurantUser.avg_rating) ? "Not Specified" : this.props.restaurantUser.avg_rating} / 5.0]</h1>
                        <p>{this.props.restaurantUser.city}, {this.props.restaurantUser.state}</p>
                        <hr></hr>
                        <p>{this.props.restaurantUser.res_desc}</p>

                    </div>
                    <div class="modify-menu">
                        <ul class="list-unstyled">
                            <li>Add Photos</li>
                            <div>
                                <input class="image-upload" type="file" class="form-control" onChange={this.onFileChange} />
                                <button class="image-upload" onClick={this.onFileUpload}>
                                    Upload!
                                 </button>
                            </div>
                            <br></br>
                            <li><NavLink to="/restaurantModify">Update Your Profile</NavLink></li>
                            <li><NavLink to="/restaurantAddMenu">Add a New Menu</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div class="restaurant-main-content row">
                    <div class="restaurant-profile-reviews col-lg-4">
                        <h1>{this.props.restaurantUser.name}'s reviews</h1>
                        {reviewsVar}
                    </div>
                    <div class="restaurant-profile-menus col-lg-5">
                        <h1>{this.props.restaurantUser.name}'s menus (Click Menu To Edit)</h1>
                        {menusVar}
                    </div>
                    <div class="about-restaurant col-lg-3">
                        <h1>About {this.props.restaurantUser.name}</h1>
                        <ul class="list-unstyled">
                            <li>
                                <h2>[ Food Type ]</h2>
                                <p>{this.props.restaurantUser.type_of_food}</p>
                            </li>
                            <li>
                                <h2>[ Location ]</h2>
                                <p>{this.props.restaurantUser.city}, {this.props.restaurantUser.state}</p>
                                <p>({this.props.restaurantUser.res_long}, {this.props.restaurantUser.res_lat})</p>
                            </li>
                            <li>
                                <h2> [ Contact ] </h2>
                                <p>{this.props.restaurantUser.phone_number}</p>
                            </li>
                            <li>
                                <h2> [ Delivery ]</h2>
                                <p>Dine-in: [{this.props.restaurantUser.is_dine_in_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]</p>
                                <p>Delivery: [{this.props.restaurantUser.is_delivery_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]</p>
                                <p>Pickup: [{this.props.restaurantUser.is_pickup_possible ? this.state.YES_SIGN : this.state.NO_SIGN}]</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    // console.log("!!!!", state);
    return {
        restaurantUser: state.restaurantUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantProfile);
