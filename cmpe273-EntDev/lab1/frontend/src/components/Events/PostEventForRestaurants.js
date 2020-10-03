import React, { Component } from 'react';
import './PostEventForRestaurants.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class PostEventForRestaurants extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            content: "",
            start_time: "",
            end_time: "",
            location: "",
            hashtags: "",
            res_pk: this.props.location.state.res_pk,
            res_name: this.props.location.state.res_name
        }
        console.log("Posting events for props = ", this.props);
        console.log(this.state);

        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.contentChangeHandler = this.contentChangeHandler.bind(this);
        this.startTimeChangeHandler = this.startTimeChangeHandler.bind(this);
        this.endTimeChangeHandler = this.endTimeChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.hashTagsChangeHandler = this.hashTagsChangeHandler.bind(this);

        this.submitPostEvent = this.submitPostEvent.bind(this);
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    contentChangeHandler = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    startTimeChangeHandler = (e) => {
        this.setState({
            start_time: e.target.value
        })
    }

    endTimeChangeHandler = (e) => {
        this.setState({
            end_time: e.target.value
        })
    }

    locationChangeHandler = (e) => {
        this.setState({
            location: e.target.value
        })
    }

    hashTagsChangeHandler = (e) => {
        this.setState({
            hashtags: e.target.value
        })
    }

    submitPostEvent = (e) => {
        e.preventDefault();

        const data = this.state;
        console.log(data);
        for(let key in data) {
            console.log(key, data[key])
            if (String(data[key]).replace(/\s/g, '') == "") {
                alert(`Enter keyword at "event ${key}"`,);
                break;
            }
        }

        this.setState({
            name: "",
            content: "",
            start_time: "",
            end_time: "",
            location: "",
            hashtags: "",
            res_pk: this.props.location.state.res_pk,
            res_name: this.props.location.state.res_name
        });

        axios.defaults.withCredentials = true;
        axios.post("http://localhost:3001/events", data)
            .then(response => {
                console.log("Retunred message = ", response.data);
                if (response.status === 200) {
                    this.props.history.push("/eventRestaurants");
                }
            })
            .catch(error => {
                console.log("Error has been catched : ", error.response.status);
                console.log(error.response);
                console.log("Error response data = ", error.response.data);
                if (true) {
                    this.setState({
                        errorMessage: error.response.data
                    })
                    alert(error.response.data);
                    this.props.history.push("/eventRestaurants");
                }
            });
    }

    render() {
        console.log(this.state);
        document.title = " [ Add Menu ] "

        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="addmenu-container">
                    <h1 class="go-center">Post your Event!</h1>
                    <hr></hr>
                    <h2 class="go-center">Event name</h2>
                    <div class="form-group">
                        <input onChange={this.nameChangeHandler} type="text" name="name" placeholder="Event name" value={this.state.name} required />
                    </div>

                    <h2 class="go-center">Description</h2>
                    <div class="form-group">
                        <textarea
                            onChange={this.contentChangeHandler}
                            class="yourinput-text"
                            value={this.state.content}
                            placeholder="What is it about?"
                        ></textarea>
                    </div>
                    <div class="row">
                        <div class="form-group col-lg-6">
                            <h2 class="go-center">Start Time</h2>
                            <input onChange={this.startTimeChangeHandler} type="text" name="start_time" placeholder="YYYY-MM-DD HH:MM:SS" value={this.state.start_time} required />
                        </div>
                        <div class="form-group col-lg-6">
                            <h2 class="go-center">End Time</h2>
                            <input onChange={this.endTimeChangeHandler} type="text" name="end_time" placeholder="YYYY-MM-DD HH:MM:SS" value={this.state.end_time} required />
                        </div>
                    </div>

                    <div class="row">
                    <div class="form-group col-lg-6">
                        <h2 class="go-center">Hash Tags</h2>
                        <input onChange={this.hashTagsChangeHandler} type="text" name="hash_tags" placeholder="The tags" value={this.state.hashtags} required />
                    </div>

                    <div class="form-group col-lg-6">
                        <h2 class="go-center">Location</h2>
                        <input onChange={this.locationChangeHandler} type="text" name="location" placeholder="The City and State" value={this.state.location} required />
                    </div>
                    </div>
                </div>
                <div class="btn-container">
                    <button onClick={this.submitPostEvent} class="btn btn-primary modify-btn">Post !</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        user: state.user,
        restaurantUser: state.restaurantUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER })
    }
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(PostEventForRestaurants);
