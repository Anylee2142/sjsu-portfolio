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
                <nav class="navbar navbar-default navbar-background">
                    <div class="navbar-header">
                        <a href="#" class="navbar-brand">Yelp</a>
                    </div>
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input type="text" class="form-control"></input>
                        </div>
                        <button type="submit" class="btn btn-default"><span class="button-style">Search!</span></button>
                    </form>

                    <ul class="nav navbar-nav navbar-right go-to-right">
                        <li><a href="#">Sign Up</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;