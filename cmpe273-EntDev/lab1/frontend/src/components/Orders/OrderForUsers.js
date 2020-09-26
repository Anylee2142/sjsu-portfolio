import React, { Component } from 'react';
import './OrderForUsers.css';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


//create the Navbar Component
class OrderForUsers extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            orders: [],
            errorMessage: ""
        }
    }

    componentWillMount() {
        // Connect DB to fetch events
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/orders/${this.props.user.user_pk}`)
            .then(response => {
                console.log("Fetched Orderse = ", response.data);
                this.setState({
                    orders: response.data
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

        document.title = "Check your Orders !"
        return (
            <div>
                <div class="orders-container">
                    <h1 class="inline-h1">Your Orders !</h1>
                
                    <br></br>
                    <ul>
                        {this.state.orders.map(order => (
                            <li class="each-order">
                                <div class="inline-div">[{order.order_status}]</div>
                                <div class="inline-div div-go-right">{order.order_date.split("T")[0]}</div>
                                <br></br>
                                <div>
                                {order.res_name} {order.res_avg_rating} / 5.0
                                </div>
                                <div>Total of ${order.total_price}</div>
                                <div>YOUR_ORDER_MENUS_HERE !</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderForUsers);