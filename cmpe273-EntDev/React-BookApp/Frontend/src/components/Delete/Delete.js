import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

class Delete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            BookID: "",
            isSuccess: false,
            errorMessage: ""
        }

        this.bookidChangeHandler = this.bookidChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            isSuccess: false
        })
    }

    bookidChangeHandler = (e) => {
        this.setState({
            BookID: e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            BookID: this.state.BookID,
        };
        this.setState({
            BookID: "",
        });
        axios.defaults.withCredentials = true;
        axios.post("http://127.0.0.1:3001/delete", data)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        isSuccess: true
                    })
                }
            }).catch((error) => {
                console.log("Error has been catched : ", error.response.status);
                if (error.response.status === 404) { // Can't found the resource
                    this.setState({
                        isSuccess: false,
                        errorMessage: error.response.data
                    })
                }
            });
    }

    render() {

        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }

        let redirectHome = null;
        if (this.state.isSuccess) {
            redirectHome = <Redirect to="/home" />
        }

        let errorMessageVar = null;
        if (this.state.errorMessage !== "") {
            errorMessageVar = (
                <h5 class="error" style={{float: "left"}}>{this.state.errorMessage}</h5>
            )
        }

        return (
            <div>
                {redirectVar}
                {redirectHome}
                <div class="container">
                    <form>
                        <div style={{ width: "50%", float: "left" }} class="form-group">
                            <input onChange={this.bookidChangeHandler} type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID" value={this.state.BookID} required />
                        </div>
                        <div style={{ width: "50%", float: "right" }}>
                            <button onClick={this.submitLogin} class="btn btn-success" type="submit">Delete</button>
                        </div>
                    </form>
                {errorMessageVar}
                </div>
            </div>
        )
    }
}

export default Delete;