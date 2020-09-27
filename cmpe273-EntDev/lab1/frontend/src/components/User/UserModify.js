import React, { Component } from 'react';
import './UserModify.css';
import axios from 'axios';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class UserModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "", state: "", country: "",
            nickname: "",
            favorite: "", til: "",
            phone_number: "", website: "",
            errorMessage: ""
        }

        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.nicknameChangeHandler = this.nicknameChangeHandler.bind(this);
        this.favoriteChangeHandler = this.favoriteChangeHandler.bind(this);
        this.tilChangeHandler = this.tilChangeHandler.bind(this);
        this.phone_numberChangeHandler = this.phone_numberChangeHandler.bind(this);
        this.websiteChangeHandler = this.websiteChangeHandler.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
    }

    componentWillMount() {
        // // Triggered when refresh
        // if (this.props.user.email === "" && this.props.user.password === "") {
        //     console.log("Reload state from local Storage !");
        //     let userProfile = localStorage.getItem("user_profile");
        //     this.props.renderToProfile(JSON.parse(userProfile));
        //     console.log("Reloaded object is", userProfile);
        // }
        console.log("User profile = ", this.props.user);
        console.log("Profile Update page state = ", this.state);
    }

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }

    countryChangeHandler = (e) => {
        this.setState({
            country: e.target.value
        })
    }

    nicknameChangeHandler = (e) => {
        this.setState({
            nickname: e.target.value
        })
    }

    favoriteChangeHandler = (e) => {
        this.setState({
            favorite: e.target.value
        })
    }

    tilChangeHandler = (e) => {
        this.setState({
            til: e.target.value
        })
    }

    phone_numberChangeHandler = (e) => {
        this.setState({
            phone_number: e.target.value
        })
    }

    websiteChangeHandler = (e) => {
        this.setState({
            website: e.target.value
        })
    }

    //submit Update handler to send a request to the node backend
    submitUpdate = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {};
        for (const key in this.state) {
            const user_input = this.state[key];
            console.log("@@@@", key, user_input);
            // If user enters nothing, then don't put it
            if (!user_input.replace(/\s/g, '')) {
                console.log("!!");
                continue;
            }
            data[key] = user_input;

            const changedState = {}
            changedState[key] = ""
            this.setState(changedState);
        }

        console.log("User update data = ", data);
        console.log("Current state = ", this.state);

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        if (Object.keys(data).length > 0) {
            axios.put(`http://localhost:3001/user/${this.props.user["user_pk"]}`, data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    // console.log(response.data);
                    if (response.status === 200) {
                        this.props.renderToProfile(data);
                        console.log("Current user at update page = ", this.props.user);
                        localStorage.setItem("user_profile", JSON.stringify(this.props.user));
                        this.props.history.push("/userProfile");
                    }
                }).catch((error) => {
                    console.log("Error has been catched : ", error.response.status);
                    console.log(error.response);
                    console.log("Error response data = ", error.response.data);
                    if (true) { // When couldn't find user
                        this.setState({
                            errorMessage: error.response.data
                        })
                    }
                });
        } else {
            alert("You must enter at least one of the fields !");
        }
    }

    render() {
        // TODO: split below into container and component
        document.title = "Modify Profile"
        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="modify-container">
                    <h1> Update Your Profile !</h1>
                    <div>
                        <p>Your Address: City, State, and Country</p>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.cityChangeHandler} type="text" name="city" placeholder="City" value={this.state.city} required />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.stateChangeHandler} type="text" name="state" placeholder="State" value={this.state.state} required />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <input onChange={this.countryChangeHandler} type="text" name="country" placeholder="Country" value={this.state.country} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        Your NickName?
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <input onChange={this.nicknameChangeHandler} type="text" name="nickname" placeholder="Your Nickname ;)" value={this.state.nickname} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        Your favorite, Things you Love
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <input onChange={this.favoriteChangeHandler} type="text" name="favorite" placeholder="Apple pie? or English Bulldog?" value={this.state.favorite} required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <input onChange={this.tilChangeHandler} type="text" name="til" placeholder="Ha Hi Hu He Ho" value={this.state.til} required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        Phone number, Website
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <input onChange={this.phone_numberChangeHandler} type="text" name="phone_number" placeholder="phone_number" value={this.state.phone_number} required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <input onChange={this.websiteChangeHandler} type="text" name="website" placeholder="Your Webpage !" value={this.state.website} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-container">
                    <button onClick={this.submitUpdate} class="btn btn-primary modify-btn">Update</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserModify);
