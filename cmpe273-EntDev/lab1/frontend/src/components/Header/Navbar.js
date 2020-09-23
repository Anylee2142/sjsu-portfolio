import React, { Component } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push("/restaurantList");
    }

    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    {/* <li><Link to="/restaurantList" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Orders</Link></li>
                    <li><Link to="/restaurantList" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Events</Link></li>
                    <li><Link to="/restaurantList" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Reviews</Link></li> */}
                    <li><Link to="/userProfile"><span class="glyphicon glyphicon-user"></span>Profile</Link></li>
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
        }
        let redirectVar = <Redirect to="/restaurantList" />;
        let navBarVar = null;
        if(!window.location.href.includes("/userLogin") && !window.location.href.includes("/userSignup")) {
            navBarVar = (
                <nav class="navbar navbar-default navbar-background">
                    <div class="navbar-header">
                        <a href="#" onClick={this.handleClick} class="navbar-brand">Yelp</a>
                    </div>
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" class="form-control"></input>
                        </div>
                        <button type="submit" class="btn btn-default"><span class="button-style">Search!</span></button>
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

export default Navbar;