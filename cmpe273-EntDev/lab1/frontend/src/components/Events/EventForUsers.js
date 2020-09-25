import React, { Component } from 'react';
import './EventForUsers.css';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


//create the Navbar Component
class EventForUsers extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            events: [],
            errorMessage: ""
        }
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
                <div class="events-container">
                    <h1>Events</h1>
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
                                <div>Hash tags: [ {event.hashtag} ]</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default EventForUsers;