import React, { Component } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


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
        localStorage.removeItem("user_profile");
        this.props.flushUser();
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
                    <li><Link to="/userProfile"><span class="glyphicon glyphicon-user"></span>{this.props.user["name"]}'s Profile</Link></li>
                    <li><Link to="/eventUsers"><span class="glyphicon glyphicon-user"></span>Events</Link></li>
                    <li><Link to="/userProfile"><span class="glyphicon glyphicon-user"></span>Orders</Link></li>
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({type: actionTypes.RENDER_TO_PROFILE, payload: payload}),
        flushUser: () => dispatch({type: actionTypes.FLUSH_USER})
        // onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        // onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        // onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
        // onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        // onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        // onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);