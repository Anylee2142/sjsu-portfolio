import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ALLOWED_PAGES: [
                "restaurantList",
                "userLogin",
                "userSignup",
                "home",
                ""
            ],
            keyword: ""
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.keywordChangeHandler = this.keywordChangeHandler.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.submitSearch = this.submitSearch.bind(this);

        console.log("Navbar for props", this.props);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("user_profile");
        this.props.flushUser();
    }

    componentWillMount() {
        // Triggered when refresh, individual page doesn't need to load redux from local storage everytime. Just do it once here
        // Since Navbar is rendered everytime
        if (this.props.user.email === "" && this.props.user.password === "") {
            console.log("Reload state from local Storage !");
            let userProfile = localStorage.getItem("user_profile");
            this.props.renderToProfile(JSON.parse(userProfile));
            console.log("Reloaded object is", userProfile);
        }

        console.log("My current location = ", navigator.geolocation.getCurrentPosition((position) => {
            console.log("Long = ", position.coords.longitude, "Lat = ",position.coords.latitude);
            this.props.renderToGeolocation({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            });
        }));

        this.setState({
            keyword: ""
        })

        // TODO - Explicit compare, not includes !
        if (window.location.href.split("/").slice(2).join("/") === window.location.host + "/home") {
            // Connect DB to fetch restaurants
            axios.defaults.withCredentials = true;

            // If there's something in global state of searched
            // Pass them into state's restaurant
            axios.get("http://localhost:3001/restaurants")
                .then(response => {
                    this.props.renderToRestaurant(response.data);
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
                })
        }


        console.log("User profile = ", this.props.user);
    }

    keywordChangeHandler = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    refreshPage = (e) => {

        this.setState({
            keyword: ""
        }) 
        // TODO - Explicit compare, not includes !
        if (window.location.href.split("/").slice(2).join("/") === window.location.host + "/home") {
            window.location.reload();
        } else {
            this.props.history.push("/home");
        }
    }

    submitSearch = (e) => {

        e.preventDefault();
        axios.defaults.withCredentials = true;

        if (this.state.keyword.replace(/\s/g, '') === "") {
            alert("You must enter some word !");
            this.setState({ keyword: "" });
            return;
        }

        if (this.state.keyword.length < 5) {
            alert("Keyword should be bigger than length of 5");
            this.setState({ keyword: "" })
            return;
        }

        console.log("Current Search state before sending request = ", this.state);

        if (cookie.load('cookie')) {
            let processedKeyword = this.state.keyword.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
            let argumentKeyword = null;

            if (processedKeyword.includes("delivery")) {
                argumentKeyword = "delivery";
            } else if (processedKeyword.includes("pickup")) {
                argumentKeyword = "pickup";
            } else if (processedKeyword.includes("dinein")) {
                argumentKeyword = "dinein";
            }
            argumentKeyword = argumentKeyword ? argumentKeyword : this.state.keyword;

            console.log("Final keyword for request = ", argumentKeyword);
            axios.get(`http://localhost:3001/search?keyword=${argumentKeyword}`)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    // console.log(response.data);
                    if (response.status === 200) {
                        console.log("data = ", response.data);
                        this.setState({
                            keyword: ""
                        });
                        this.props.renderToRestaurant(response.data);
                        console.log("SEARCHED RESTAURANTS = ", response.data);
                        console.log(this.props);
                        this.props.history.push("/home");
                    }
                }).catch((error) => {
                    console.log("Error has been catched : ", error);
                    // console.log(error.response);
                    // console.log("Error response data = ", error.response.data);
                    if (true) { // When couldn't find user
                        this.setState({
                            errorMessage: error.response.data
                        })
                    }
                });
        } else {
            this.props.history.push("/userLogin");
        }
    }

    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        let redirectVar = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/userProfile"><span class="glyphicon glyphicon-user"></span>{this.props.user["name"]}'s Profile</Link></li>
                    <li><Link to="/eventUsers"><span class="glyphicon glyphicon-user"></span>Events</Link></li>
                    <li><Link to="/orderUsers"><span class="glyphicon glyphicon-user"></span>Orders</Link></li>
                    <li><Link to="/restaurantList" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }
        else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/userLogin"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    <li><Link to="/userSignup"><span class="glyphicon glyphicon-log-in"></span> Sign Up</Link></li>
                </ul>
            )
            let splits = window.location.href.split("/");
            this.state.ALLOWED_PAGES.map(PAGE => {
                console.log(splits.slice(2, splits.length).join("/"))
                console.log(window.location.host + "/" + PAGE)
                if (splits.slice(2, splits.length).join("/") === window.location.host + "/" + PAGE) {
                    let redirectdPage = PAGE === "" ? "home" : PAGE;
                    redirectVar = (<Redirect to={"/" + redirectdPage}></Redirect>);
                }  // If context hits here, it means URL is one of the routed path
                // else, it'll be directed to etc/NotFound_404.js
            });
            if (!redirectVar) {
                // When user hits existing pages without authorization
                // Then user needs to login 
                redirectVar = (<Redirect to="/userLogin"></Redirect>);
            }
        }

        let navBarVar = null;
        if (!window.location.href.includes("/userLogin") && !window.location.href.includes("/userSignup")) {
            let placeHolder = "Dish name, Restaurant name, Food type, Location or Delivery";

            navBarVar = (
                <nav class="navbar navbar-default navbar-background">
                    <div class="navbar-header">
                        <Link to="/home" onClick={this.refreshPage} class="navbar-brand">Yelp</Link>
                        {/* <a href="#" onClick={this.handleClick} class="navbar-brand">Yelp</a> */}
                    </div>
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" onChange={this.keywordChangeHandler} class="form-control search-bar" placeholder={placeHolder} value={this.state.keyword}></input>
                        </div>
                        <button type="submit" class="btn btn-default search-btn" onClick={this.submitSearch}>
                            <span class="button-style">Search!</span>
                        </button>
                    </form>
                    {navLogin}
                </nav>
            );
        }

        return (
            <div>
                {redirectVar}
                {navBarVar}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
