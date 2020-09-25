import React, { Component } from 'react';
import './UserProfile.css';
import { NavLink } from 'react-router-dom';
import cookie from 'react-cookies';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

//create the Navbar Component
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        // Triggered when refresh
        if (this.props.user.email === "" && this.props.user.password === "") {
            console.log("Reload state from local Storage !");
            let userProfile = localStorage.getItem("user_profile");
            this.props.renderToProfile(JSON.parse(userProfile));
            console.log("Reloaded object is", userProfile);
        }
        console.log("User profile = ", this.props.user);
    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    // TODO: text generator here
    // if info, <p>{this.props.user.city}, {this.props.user.state}</p>
    // else, <p>No information yet !<p>
    
    render() {
        document.title = "Your Yelp Profile"
        return (
            <div>
                <div class="header container">
                    <div class="user-profile-picture">
                        Add a photo !
                    </div>
                    <div class="brief-summary">
                        <h1>{this.props.user.name}</h1>
                        <p>{this.props.user.city}, {this.props.user.state}</p>
                        <p>{this.props.user.phone_number} {this.props.user.dob.split("T")[0]}</p>
                        <p>Friends, Reviews Photos</p>
                    </div>
                    <div class="modify-menu">
                        <ul class="list-unstyled">
                            <li><a href="#">Add Profile Photos</a></li>
                            <li><li><NavLink to="/userModify">Update Your Profile</NavLink></li></li>
                            <li><a href="#">Find Friends</a></li>
                        </ul>
                    </div>
                </div>

                <div class="main-content container">
                    <div class="profile-list">
                        <h1>Alan's Profile</h1>
                        <div class="list-group">
                            <a href="#" class="list-group-item active">Profile Overview</a>
                            <a href="#" class="list-group-item">Friends</a>
                            <a href="#" class="list-group-item">Reviews</a>
                            <a href="#" class="list-group-item">Compliments</a>
                            <a href="#" class="list-group-item">Tips</a>
                            <a href="#" class="list-group-item">Bookmarks</a>
                            <a href="#" class="list-group-item">Collections</a>
                            <a href="#" class="list-group-item">Events</a>
                        </div>
                    </div>
                    <div class="recent-activity">
                        <h1>Notifications</h1>
                        <p>Don't sleep !</p>
                        <h1>Recent Activity</h1>
                        <hr></hr>
                    </div>
                    <div class="about-user">
                        <h1>About {this.props.user.name}</h1>
                        <ul class="list-unstyled">
                            <li>
                                <h2>[ Location ]</h2>
                                <p>{this.props.user.city}, {this.props.user.state}</p>
                            </li>
                            <li>
                                <h2>[ Things I Love ]</h2>
                                <p>{this.props.user.til}, {this.props.user.favorite}</p>
                            </li>
                            <li>
                                <h2>[ Website ]</h2>
                                <a href={this.props.user.website}>{this.props.user.website}</a>
                            </li>
                            <li>
                                <h2>[ Nickname ]</h2>
                                <p>{this.props.user.nickname}</p>
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
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER })
        // onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        // onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        // onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
        // onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        // onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        // onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
