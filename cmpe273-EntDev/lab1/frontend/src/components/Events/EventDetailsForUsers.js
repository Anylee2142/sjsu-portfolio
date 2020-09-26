import React, { Component } from 'react';
import './EventDetailsForUsers.css';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


//create the Navbar Component
class EventDetailsForUsers extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            event: this.props.location.state.event
        }
        this.submitRegister = this.submitRegister.bind(this);
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

    render() {

        document.title = "[ Event Details ]"
        return (
            <div>
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
                </div>
                <div class="btn-container">
                    <button onClick={this.submitRegister} class="btn btn-primary register-btn">Register !</button>
                </div>
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
