import React, { Component } from 'react';
import './RestaurantOrder.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class RestaurantOrder extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            restaurant: this.props.location.state.restaurant,
            menus: this.props.location.state.menus,
            qtns: [],
            qtnHandlers: [],
            dinein: false,
            delivery: false,
            pickup: false,
        }

        this.toggleDinein = this.toggleDinein.bind(this);
        this.toggleDelivery = this.toggleDelivery.bind(this);
        this.togglePickup = this.togglePickup.bind(this);
        this.returnOrderPrice = this.returnOrderPrice.bind(this);
    }

    componentWillMount() {
        // 1. make change handler for quanitities
        // 2. put them in state array
        // 3. bind
        let qtns = [];
        let qtnHandlers = [];
        this.state.menus.map((_, idx) => {
            qtns.push(0);
            const qtnHandler = (e) => {
                let qtns = this.state.qtns;
                qtns[idx] = e.target.value;
                this.setState({
                    qtns: qtns
                });
            };
            qtnHandlers.push(qtnHandler);
            this["qtn_" + idx + "_handler"] = qtnHandler.bind(this);
        });

        this.setState({
            qtns: qtns,
            qtnHandlers: qtnHandlers
        })
    }

    toggleDinein = (e) => {
        this.setState({
            dinein: true,
            delivery: false,
            pickup: false
        })
    }

    toggleDelivery = (e) => {
        this.setState({
            dinein: false,
            delivery: true,
            pickup: false
        })
    }

    togglePickup = (e) => {
        this.setState({
            pickup: false,
            delivery: false,
            pickup: true
        })
    }

    returnOrderPrice = () => {
        var orderPrice = 0;
        this.state.menus.map((menu, idx) => {
            const thePrice = menu.price;
            const theQtn = this.state.qtns[idx];
            orderPrice += thePrice * theQtn;
        });
        return orderPrice;
    }

    submitOrder = (e) => {
        e.preventDefault();

        let foodProvideCode = -1;
        if (this.state.dinein) { foodProvideCode = "0" }
        else if (this.state.pickup) { foodProvideCode = "1" }
        else if (this.state.delivery) { foodProvideCode = "2" }

        if (foodProvideCode == -1) {
            alert("SELECT DELIVERY MODE !");
            return;
        }

        let orderPrice = this.returnOrderPrice();
        if (orderPrice == 0) {
            alert("SELECT AT LEAST 1 FOOD");
            return;
        }

        const data = {
            user_pk: this.props.user.user_pk,
            res_pk: this.state.restaurant.res_pk,
            order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            food_provide_code: foodProvideCode,
            order_status: "Order Received",
            total_price: orderPrice * 1.05,
        };


        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:3001/orders`, data)
            .then(response => {
                console.log("Insert Orders response = ", response.data);
                const data1 = [];
                this.state.menus.map((menu, idx) => {
                    if (this.state.qtns[idx] != 0) {
                        data1.push([
                            response.data.insertId,
                            menu.menu_pk,
                            this.state.qtns[idx],
                            menu.price
                        ]);
                    }
                });
                axios.post("http://localhost:3001/orderMenus", data1)
                    .then(response => {
                        console.log("Insert OrderMenu response = ", response.data);
                        this.props.history.push("/orderUsers");
                    })
                    .catch(error => {
                        console.log("Error catched inside insert orderMenu = ",error);
                        // If insert fail, then remove the row where order_pk == response.data.insertId
                    })

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
        console.log(this);
        console.log(this.state);
        console.log(this.props);

        var orderPrice = this.returnOrderPrice();

        var deliveryModeVar = [];
        if (this.state.restaurant.is_dine_in_possible) {
            deliveryModeVar.push(
                <div>
                    <input onChange={this.toggleDinein} type="radio" id="dinein" name="deliveryMode" value={this.state.is_dine_in_possible}></input>
                    <label for="dinein">Dine-in</label>
                </div>
            );
        } else {
            deliveryModeVar.push(<div>Dine-in Not possible</div>);
        }
        if (this.state.restaurant.is_delivery_possible) {
            deliveryModeVar.push(
                <div>
                    <input onChange={this.toggleDelivery} type="radio" id="delivery" name="deliveryMode" value={this.state.is_delivery_possible}></input>
                    <label for="delivery">Delivery</label>
                </div>
            );
        } else {
            deliveryModeVar.push(<div>Delivery Not possible</div>);
        }
        if (this.state.restaurant.is_pickup_possible) {
            deliveryModeVar.push(
                <div>
                    <input onChange={this.togglePickup} type="radio" id="pickup" name="deliveryMode" value={this.state.is_pickup_possible}></input>
                    <label for="pickup">Pickup</label>
                </div>
            );
        } else {
            deliveryModeVar.push(<div>Pickup Not possible</div>);
        }

        document.title = "Place your Orders !"
        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="restaurant-orders-container">
                    <h1>{this.state.restaurant.name}'s Menus</h1>
                    <hr></hr>
                    <div class="row">
                        <div class="col-lg-5">Menu</div>
                        <div class="col-lg-4">Price</div>
                        <div class="col-lg-3">Qtn</div>
                    </div>
                    {this.state.menus.map((menu, idx) => (
                        <div class="row menu-detail">
                            <div class="col-lg-5">{menu.name}</div>
                            <div class="col-lg-4">${menu.price}</div>
                            <div class="col-lg-3">
                                <input
                                    onChange={this.state.qtnHandlers[idx]} type="number" name="rating"
                                    min="0" value={this.state.qtns[idx]} class="menu-detail-qtn"
                                ></input>
                            </div>
                        </div>
                    ))}
                    <br></br>
                    <h1>Choose your Delivery mode !</h1>
                    <hr></hr>
                    <div class="delivery-mode-config">{deliveryModeVar}</div>
                </div>
                <hr></hr>
                <div class="restaurant-orders-total">
                    <p>Orders Price: ${orderPrice}</p>
                    <p>Tax and Fees: ${orderPrice * 0.05}</p>
                    <hr></hr>
                    <p class="go-right">Total Price: ${orderPrice * 1.05}</p>
                    <button type="submit" class="btn btn-default restaurant-orders-btn" onClick={this.submitOrder}>
                        <span class="button-style">Checkout!</span>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        user: state.user,
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

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrder);