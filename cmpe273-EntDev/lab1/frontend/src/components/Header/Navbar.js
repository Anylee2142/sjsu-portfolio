import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

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
            ]
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
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
        console.log("User profile = ", this.props.user);
    }

    submitSearch = (e) => {
        // console.log("Current login state before sending request = ", this.state);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/user/login', data)
        //     .then(response => {
        //         console.log("Status Code : ", response.status);
        //         // console.log(response.data);
        //         if (response.status === 200) {
        //             this.props.renderToProfile(response.data[0]);
        //             localStorage.setItem("user_profile", JSON.stringify(response.data[0]));
        //             this.props.history.push("/restaurantList");
        //         }
        //     }).catch((error) => {
        //         console.log("Error has been catched : ", error.response.status);
        //         console.log(error.response);
        //         console.log("Error response data = ", error.response.data);
        //         if (true) { // When couldn't find user
        //             this.setState({
        //                 errorMessage: error.response.data
        //             })
        //         }
        //     });
    }

    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        let redirectVar = null;
        console.log("!!!Current location = ", window.location.href);
        console.log(this.props);
        console.log(this.state);
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
                console.log(window.location.host + "/" +PAGE)
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
            navBarVar = (
                <nav class="navbar navbar-default navbar-background">
                    <div class="navbar-header">
                        <Link to="/home" class="navbar-brand">Yelp</Link>
                        {/* <a href="#" onClick={this.handleClick} class="navbar-brand">Yelp</a> */}
                    </div>
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" class="form-control search-bar"></input>
                        </div>
                        <button type="submit" class="btn btn-default search-btn">
                            <Link to="/home">
                                <span class="button-style">Search!</span>
                            </Link>
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


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);