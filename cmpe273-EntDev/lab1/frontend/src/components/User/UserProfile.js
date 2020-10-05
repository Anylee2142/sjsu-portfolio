import React, { Component} from 'react';
import './UserProfile.css';
import { NavLink} from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';
import axios from 'axios';

//create the Navbar Component
class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: (this.props.location.state && "user" in this.props.location.state) ? this.props.location.state.user : null,
            profile_picture : null,
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    onFileChange = (e) => {
        this.setState({
            profile_picture: e.target.files[0]
        })
    }

    onFileUpload = (e) => {
        const data = new FormData();
        if (!this.state.profile_picture) {
            alert("Please proceed after uploading a picture !");
        }
        data.append('file', this.state.profile_picture);

        axios.post(`http://localhost:3001/images/users/${this.props.user.user_pk}`, data)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
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

    componentWillMount() {
        // Triggered when refresh
        if (this.props.user.email === "" && this.props.user.password === "") {
            console.log("Reload state from local Storage !");
            let userProfile = localStorage.getItem("user_profile");
            this.props.renderToProfile(JSON.parse(userProfile));
            console.log("Reloaded object is", userProfile);
        }
        console.log("User profile = ", this.props);
        console.log(this.state);
    }


    // TODO: text generator here
    // if info, <p>{this.props.user.city}, {this.props.user.state}</p>
    // else, <p>No information yet !<p>

    render() {
        console.log(this.state);

        var profilePicURL = `http://localhost:3001/user_${this.props.user.user_pk}_profile.png`;
        console.log(profilePicURL);
        var user = (this.state.user) ? this.state.user : this.props.user;
        var updateProfileVar = (
            <h1>Restaurant is viewing User Profile!</h1>
        );

        if (this.state.user === null) {
            updateProfileVar = (
                <ul class="list-unstyled">
                    <li>Add Profile Photo</li>
                    <div>
                        <input class="image-upload" type="file" class="form-control" onChange={this.onFileChange} />
                        <button class="image-upload" onClick={this.onFileUpload}>
                            Upload!
                         </button>
                    </div>
                    <br></br>
                    <li><li><NavLink to="/userModify">Update Your Profile</NavLink></li></li>
                    <li>Find Friends</li>
                </ul>
            );
        }

        console.log("###", user.dob);
        document.title = "Your Yelp Profile"
        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="header container">
                    <div class="user-profile-picture">
                        <img src={profilePicURL}></img>
                    </div>
                    <div class="brief-summary">
                        <h1>{user.name}</h1>
                        <p>{user.city}, {user.state}</p>
                        <p>{user.phone_number} {user.dob != null ? user.dob.split("T")[0] : ""}</p>
                        <p>Friends, Reviews Photos</p>
                    </div>
                    <div class="modify-menu">
                        {updateProfileVar}
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
                        <h1>About {user.name}</h1>
                        <ul class="list-unstyled">
                            <li>
                                <h2>[ Location ]</h2>
                                <p>{user.city}, {user.state}</p>
                            </li>
                            <li>
                                <h2>[ Things I Love ]</h2>
                                <p>{user.til}, {user.favorite}</p>
                            </li>
                            <li>
                                <h2>[ Website ]</h2>
                                <a href={user.website}>{user.website}</a>
                            </li>
                            <li>
                                <h2>[ Nickname ]</h2>
                                <p>{user.nickname}</p>
                            </li>
                        </ul>
                    </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
