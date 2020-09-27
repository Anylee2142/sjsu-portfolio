import React, { Component } from 'react';

import Navbar from '../Header/Navbar';

class RootRouter extends Component {
    //call the constructor method
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.history.push("/home");
    }

    render() {
        return (<div></div>);
    }
}


//export Login Component
export default RootRouter;