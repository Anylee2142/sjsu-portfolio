import React, { Component } from 'react';
import './etc.css';
import { Redirect } from 'react-router';

import Navbar from '../Header/Navbar';


//Define a Login Component
class NotFound_404 extends Component {
    //call the constructor method
    constructor(props) {
        super(props);
        this.state = {
            second: 3
        }
    }

    componentWillMount() {
        let timer = setInterval(() => {
            this.setState({
                second: this.state.second -1
            })
            if (this.state.second == 0) {
                clearInterval(timer);
                this.props.history.push("/home");
            }
        }, 1000)
    }

    componentDidMount() {

    }
    render() {

        document.title = "404 - Not Found"
        return (
            <div>
                {/* <Navbar></Navbar> */}
                <div class="warning">
                    <p>Page Not Found !</p>
                    <p>It will be redirected to main page</p>
                    <p>in {this.state.second}...</p>
                </div>
            </div>
        )
    }
}

export default NotFound_404;
