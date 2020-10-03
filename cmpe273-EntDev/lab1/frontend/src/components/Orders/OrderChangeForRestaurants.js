import React, { Component } from 'react';
import './OrderChangeForRestaurants.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class OrderChangeForRestau extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            food_provide_code: null,
            order_pk: null,
            options: [],
            orderReceived: false,
            orderPreparing: false,
            firstOption: false,
            secondOption: false,
            cancelOrder: false,
        }
        console.log("Order Change for props = ", this.props);
        console.log(this.state);

        this.toggleOrderReceived = this.toggleOrderReceived.bind(this);
        this.toggleOrderPreparing = this.toggleOrderPreparing.bind(this);
        this.toggleFirstOption = this.toggleFirstOption.bind(this);
        this.toggleSecondOption = this.toggleSecondOption.bind(this);
        this.toggleCancelOrder = this.toggleCancelOrder.bind(this);

        this.submitOrderChange = this.submitOrderChange.bind(this);
        this.determineOrderStatus = this.determineOrderStatus.bind(this);
    }

    componentWillMount() {
        let foodProvideCode = null;
        let orderPk = null;
        let options = null;
        if (this.props.location.state) {
            if ("order" in this.props.location.state) {
                foodProvideCode = this.props.location.state.order.food_provide_code;
                orderPk = this.props.location.state.order.order_pk;

                if (foodProvideCode == 1) options = ["Pickup Ready", "Picked Up"]; // Pickup
                else if (foodProvideCode == 2) options = ["On The Way", "Delivered"]; // Delivery
            }
            this.setState({
                orderReceived: false,
                orderPreparing: false,
                firstOption: false,
                secondOption: false,
                food_provide_code: foodProvideCode,
                order_pk: orderPk,
                options: options,
                cancelOrder: false,
            })
        }
    }

    toggleOrderReceived() {
        this.setState({
            orderReceived: !this.state.orderReceived,
            orderPreparing: false,
            firstOption: false,
            secondOption: false,
            cancelOrder: false
        })
    }

    toggleOrderPreparing() {
        this.setState({
            orderReceived: false,
            orderPreparing: !this.state.orderPreparing,
            firstOption: false,
            secondOption: false,
            cancelOrder: false
        })
    }

    toggleFirstOption() {
        this.setState({
            orderReceived: false,
            orderPreparing: false,
            firstOption: !this.state.firstOption,
            secondOption: false,
            cancelOrder: false
        })
    }

    toggleSecondOption() {
        this.setState({
            orderReceived: false,
            orderPreparing: false,
            firstOption: false,
            secondOption: !this.state.secondOption,
            cancelOrder: false
        })
    }

    toggleCancelOrder() {
        this.setState({
            orderReceived: false,
            orderPreparing: false,
            firstOption: false,
            secondOption: false,
            cancelOrder: !this.state.cancelOrder
        })
    }

    determineOrderStatus() {
        let orderStatus = "Not determined ! Contact Admin ASAP";
        if (this.state.orderReceived) { orderStatus = "Order Received"; }
        else if (this.state.orderPreparing) { orderStatus = "Order Preparing"; }
        else if (this.state.firstOption) { orderStatus = this.state.options[0]; }
        else if (this.state.secondOption) { orderStatus = this.state.options[1]; }
        else if (this.state.cancelOrder) { orderStatus = "Cancelled Order"; }
        return orderStatus;
    }



    submitOrderChange = (e) => {
        e.preventDefault();
        const data = {
            order_status: this.determineOrderStatus(),
        };

        this.setState({
            food_provide_code: null,
            order_pk: null,
            options: [],
            orderReceived: false,
            orderPreparing: false,
            firstOption: false,
            secondOption: false,
            cancelOrder: false
        });

        axios.defaults.withCredentials = true;
        axios.put(`http://localhost:3001/orders/restaurants/${this.state.order_pk}`, data)
            .then(response => {
                console.log("Retunred message = ", response.data);
                if (response.status === 200) {
                    this.props.history.push("/orderRestaurants");
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
                    this.props.history.push("/orderRestaurants");
                }
            });
    }

    render() {
        console.log(this.state);
        document.title = " [ Order Change ] "

        var lastTwoDisplayVar = (
            <div>
                <div>
                    <input onChange={this.toggleFirstOption} type="radio" id="3" name="category" value={this.state.firstOption}></input>
                    <label for="3">{this.state.options[0]}</label>
                </div>
                <div>
                    <input onChange={this.toggleSecondOption} type="radio" id="4" name="category" value={this.state.secondOption}></input>
                    <label for="4">{this.state.options[1]}</label>
                </div>
            </div>
        );

        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="orderchange-container">
                    <div class="row">
                        <h2 class="go-center">Category</h2>
                        <div>
                            <input onChange={this.toggleOrderReceived} type="radio" id="1" name="category" value={this.state.orderReceived}></input>
                            <label for="1">Order Received</label>
                        </div>
                        <div>
                            <input onChange={this.toggleOrderPreparing} type="radio" id="2" name="category" value={this.state.orderPreparing}></input>
                            <label for="2">Order Preparing</label>
                        </div>
                        {lastTwoDisplayVar}
                        <div>
                            <input onChange={this.toggleCancelOrder} type="radio" id="5" name="category" value={this.state.cancelOrder}></input>
                            <label for="5">Cancel Order</label>
                        </div>
                    </div>

                </div>
                <div class="btn-container">
                    <button onClick={this.submitOrderChange} class="btn btn-primary modify-btn">Change !</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderChangeForRestau);
