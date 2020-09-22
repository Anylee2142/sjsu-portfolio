import React, { Component } from 'react';
import './UserProfile.css';
import { Link, NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//create the Navbar Component
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        return (
            <div>
                <div class="header container">
                    <div class="user-profile-picture">
                        Add a photo !
                    </div>
                    <div class="brief-summary">
                        <h1>Alan Lee</h1>
                        <p>Downtown San Jose, San Jose, CA</p>
                        <p>Friends, Reviews Photos</p>
                    </div>
                    <div class="modify-menu">
                        <ul class="list-unstyled">
                            <li><a href="#">Add Profile Photos</a></li>
                            <li><a href="#">Update Your Profile</a></li>
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
                        <h1>About Alan Lee</h1>
                        <ul class="list-unstyled">
                            <li>
                                <h2>[ Location ]</h2>
                                <p>San Jose Downtown</p>
                            </li>
                            <li>
                                <h2>[ Things I Love ]</h2>
                                <p>Reading, Thinking</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

export default UserProfile;
