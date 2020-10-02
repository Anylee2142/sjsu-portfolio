import React, { Component } from 'react';
import './EventForRestaurants.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Navbar from '../Header/Navbar';

//create the Navbar Component
class EventForRestaurants extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            events: [],
            errorMessage: ""
        }
        console.log("Event for props = ", this.props);
    }

    componentWillMount() {
        // Connect DB to fetch events
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/events")
            .then(response => {
                console.log("Fetched Events = ", response.data);
                this.setState({
                    events: response.data
                });
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
    }

    render() {

        document.title = "Find your Events !"
        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="events-container">
                    <h1 class="inline-h1">Events</h1>
                    <Link class="inline-h1 go-right" to={{
                        pathname: "/registeredEventUsers",
                        state: { user_pk : this.props.user.user_pk}
                    }}>[Click for Registered Events !]</Link>
                    <br></br>
                    <ul>
                        {this.state.events.map(event => (
                            <li>
                                <div class="res_name">
                                    <Link to= {{
                                        pathname: "/eventDetailsUsers",
                                        state: { event: event }
                                    }}>{event.name}</Link>
                                </div>
                                <div>by {event.res_name}</div>
                                <div>
                                    {event.start_time.replace("T", " ").split(".")[0]} ~ {event.end_time.replace("T", " ").split(".")[0]}
                                </div>
                                <div>{event.location}</div>
                                <div>Hash tags: [ {event.hashtags} ]</div>
                            </li>
                        ))}
                    </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(EventForRestaurants);