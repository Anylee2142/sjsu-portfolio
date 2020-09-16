import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            BookID: "",
            Title: "",
            Author: "",
            isSuccess: false,
            errorMessage: ""
        }

        this.bookidChangeHandler = this.bookidChangeHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.authorChangeHandler = this.authorChangeHandler.bind(this);
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

    titleChangeHandler = (e) => {
        this.setState({
            Title: e.target.value
        })
    }

    authorChangeHandler = (e) => {
        this.setState({
            Author: e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            BookID: this.state.BookID,
            Title: this.state.Title,
            Author: this.state.Author
        };
        this.setState({
            BookID: "",
            Title: "",
            Author: ""
        });
        axios.defaults.withCredentials = true;
        axios.post("http://127.0.0.1:3001/create", data)
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
                if (error.response.status === 409) { // Conflict with existing resource
                    this.setState({
                        isSuccess: false,
                        errorMessage: error.response.data
                    })
                }
            });
    }

    render() {
        //if not logged in go to login page
        console.log(this.state);

        let redirectLogin = null;
        if (!cookie.load('cookie')) {
            redirectLogin = <Redirect to="/login" />
        }

        let redirectHome = null;
        if (this.state.isSuccess) {
            redirectHome = <Redirect to="/home" />
        }

        let errorMessageVar = null;
        if (this.state.errorMessage !== "") {
            errorMessageVar = (
                <h5 class="error">{this.state.errorMessage}</h5>
            )
        }

        return (
            <div>
                {redirectLogin}
                {redirectHome}
                <br />
                <div class="container">
                    <form action="http://127.0.0.1:3001/create" method="POST">
                        <div style={{ width: '30%' }} class="form-group">
                            <input onChange={this.bookidChangeHandler} type="text" class="form-control" name="BookID" placeholder="Book ID" value={this.state.BookID} required />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input onChange={this.titleChangeHandler} type="text" class="form-control" name="Title" placeholder="Book Title" value={this.state.Title} required />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input onChange={this.authorChangeHandler} type="text" class="form-control" name="Author" placeholder="Book Author" pattern="^[A-Za-z -]+$" value={this.state.Author} required />
                        </div>
                        <br />
                        <div style={{ width: '30%' }}>
                            <button onClick={this.submitLogin} class="btn btn-success" type="submit">Create</button>
                        </div>
                    </form>
                    <br />
                    {errorMessageVar}
                </div>
            </div>
        )
    }
}

export default Create;