import React, { Component } from 'react';
import './UserModify.css';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

//create the Navbar Component
class UserModify extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // Triggered when refresh
        if (this.props.user.email === "" && this.props.user.password === "") {
            console.log("Reload state from local Storage !");
            let userProfile = localStorage.getItem("user_profile");
            this.props.renderToProfile(JSON.parse(userProfile));
            console.log("Reloaded object is", userProfile);
        }
        console.log("User profile = ", this.props.user);
    }

    render() {

        document.title = "Modify Profile"
        return (
            <div>
                <div class="modify-container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                <input onChange={this.emailIDChangeHandler} type="email" name="emailID" placeholder="Email ID" required />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" name="password" placeholder="Password" required />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <button onClick={this.submitLogin} class="btn btn-primary">Login</button>
                        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserModify);
