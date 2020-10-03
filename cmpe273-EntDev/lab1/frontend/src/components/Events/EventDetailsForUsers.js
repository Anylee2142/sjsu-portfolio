import React, { Component } from 'react';
import './EventDetailsForUsers.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';
import cookie from 'react-cookies';

//create the Navbar Component
class EventDetailsForUsers extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            event: this.props.location.state.event,
            registeredUsers: null,
            isMyEvent: this.props.location.state.isMyEvent,
            render: false
        }
        this.submitRegister = this.submitRegister.bind(this);
    }

    componentWillMount() {
        if (cookie.load("restaurantCookie")) {
            axios.get(`http://localhost:3001/events/${this.state.event.event_pk}`)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        registeredUsers: response.data
                    }) // Flush after successful register
                    // this.props.history.push("/restaurantList"); // To Registered Events
                    // this.props.history.push("/eventRestaurants");
                    console.log("Finshed !");
                }
            }).catch((error) => {
                console.log("Error has been catched : ", error.response.status);
                console.log(error.response);
                console.log("Error response data = ", error.response.data);
                if (true) { // When couldn't find user
                    this.setState({
                        errorMessage: error.response.data
                    })
                    alert(error.response.data);
                    this.props.history.push("/eventRestaurants");
                }
            });
        }
    }

    submitRegister = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            user_pk: this.props.user["user_pk"],
            event_pk: this.state.event["event_pk"],
            res_pk: this.state.event["res_pk"]
        };

        console.log("Event Register sending data = ", data);

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/eventRegisters', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                // console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                    }) // Flush after successful register
                    // this.props.history.push("/restaurantList"); // To Registered Events
                    this.props.history.push("/eventUsers");
                    console.log("Finshed !");
                }
            }).catch((error) => {
                console.log("Error has been catched : ", error.response.status);
                console.log(error.response);
                console.log("Error response data = ", error.response.data);
                if (true) { // When couldn't find user
                    this.setState({
                        errorMessage: error.response.data
                    })
                    alert(error.response.data);
                    this.props.history.push("/eventUsers");
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

        var buttonVar = null;
        var userListVar = null;

        if (this.state.render) {
            if (cookie.load("userCookie")) {
                buttonVar = (
                    <div class="btn-container">
                        <button onClick={this.submitRegister} class="btn btn-primary register-btn">Register !</button>
                    </div>
                );
            }
            if (cookie.load("restaurantCookie") && this.state.isMyEvent) {
                userListVar = (
                    <div class="registerd-users">
                        Registered Users:
                        {this.state.registeredUsers.map((user) => ((<Link to={
                            {
                                pathname: "/userProfile",
                                state: { user: user }
                            }
                        }>{" "+user.name}</Link>)))}
                    </div>
                );
            }
        }
        

        document.title = "[ Event Details ]"
        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="event-container">
                    <h1>Event</h1>
                    <div class="res_name">{this.state.event.name}</div>
                    <div class="event-content">
                        {this.state.event.content}
                    </div>
                    <div>by {this.state.event.res_name}</div>

                    <div>
                        {this.state.event.start_time.replace("T", " ").split(".")[0]} ~ {this.state.event.end_time.replace("T", " ").split(".")[0]}
                    </div>
                    <div>{this.state.event.location}</div>
                    <div>Hash tags: [ {this.state.event.hashtags} ]</div>
                    {userListVar}
                </div>
                {buttonVar}
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
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

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsForUsers);
