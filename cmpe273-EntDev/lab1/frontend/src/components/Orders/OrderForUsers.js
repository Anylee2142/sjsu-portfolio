import React, { Component } from 'react';
import './OrderForUsers.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class OrderForUsers extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            orders: [],
            errorMessage: "",
            orderMenus: [],
            filterFirstOption: false,
            filterSecondOption: false,
            filterThirdOption: false,
            filterFourthOption: false,
            filterFirstKeyword: ["Order Received"],
            filterSecondKeyword: ["Preparing"],
            filterThirdKeyword: ["On The Way", "Pick Up Ready"],
            filterFourthKeyword: ["Delivered", "Picked Up"],
        }
        console.log("Orders for props = ", this.props);

        this.determineDeliveryCode = this.determineDeliveryCode.bind(this);
        this.returnOrderMenus = this.returnOrderMenus.bind(this);
        this.toggleFirstOption = this.toggleFirstOption.bind(this);
        this.toggleSecondOption = this.toggleSecondOption.bind(this);
        this.toggleThirdOption = this.toggleThirdOption.bind(this);
        this.toggleFourthOption = this.toggleFourthOption.bind(this);
        this.isFilterOff = this.isFilterOff.bind(this);
        this.getMeTrueFilter = this.getMeTrueFilter.bind(this);
    }

    componentWillMount() {
        this.setState({
            filterFirstOption: false,
            filterSecondOption: false,
            filterThirdOption: false,
            filterFourthOption: false
        })
    }

    componentDidMount() {
        // Connect DB to fetch events
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/orders/${this.props.user.user_pk}`)
            .then(response => {
                console.log("Fetched Orderse = ", response.data);
                let orders = response.data;
                this.setState({
                    orders: orders
                });
                console.log("Chaning Local State Finished !");
                axios.get(`http://localhost:3001/orderMenus/${this.props.user.user_pk}`)
                    .then(response => {
                        console.log("Fetched Order Menus = ", response.data);
                        console.log(this.state.orders);
                        let stateOrderMenus = [];
                        this.state.orders.map((order) => {
                            let order_pk = order.order_pk;
                            let orderMenus = response.data.filter((order_inside) => {
                                return order_pk == order_inside.order_pk
                            });
                            stateOrderMenus.push(orderMenus);
                        });
                        this.setState({
                            orderMenus: stateOrderMenus
                        })

                    })
                    .catch(error => {

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

    toggleFirstOption() {
        this.setState({
            filterFirstOption: !this.state.filterFirstOption,
            filterSecondOption: false,
            filterThirdOption: false,
            filterFourthOption: false
        })
    }

    toggleSecondOption() {
        this.setState({
            filterFirstOption: false,
            filterSecondOption: !this.state.filterSecondOption,
            filterThirdOption: false,
            filterFourthOption: false
        })
    }

    toggleThirdOption() {
        this.setState({
            filterFirstOption: false,
            filterSecondOption: false,
            filterThirdOption: !this.state.filterThirdOption,
            filterFourthOption: false
        })
    }

    toggleFourthOption() {
        this.setState({
            filterFirstOption: false,
            filterSecondOption: false,
            filterThirdOption: false,
            filterFourthOption: !this.state.filterFourthOption
        })
    }

    determineDeliveryCode(foodProvideCode) {
        let deliveryMode = "Not determined ! Contact Admin ASAP";
        if (foodProvideCode == 0) { deliveryMode = "Dine-in"; }
        else if (foodProvideCode == 1) { deliveryMode = "Pickup"; }
        else if (foodProvideCode == 2) { deliveryMode = "Delivery"; }
        return deliveryMode;
    }

    getMeTrueFilter() {
        if (this.state.filterFirstOption) {return this.state.filterFirstKeyword;}
        else if (this.state.filterSecondOption) {return this.state.filterSecondKeyword;}
        else if (this.state.filterThirdOption) {return this.state.filterThirdKeyword;}
        else if (this.state.filterFourthOption) {return this.state.filterFourthKeyword;}
    }

    returnOrderMenus(orderMenus, idx) {
        if (orderMenus.length > 0) {
            const orderMenu = orderMenus[idx];
            return (
                <div class="order-user-details">
                    <ol>
                        {orderMenu.map((detail) => (
                            <li>{detail.name} X {detail.qtn} EA</li>
                        ))}
                    </ol>
                </div>
            );
        }
        return null;
    }

    isFilterOff() {
        return (!this.state.filterFirstOption && !this.state.filterSecondOption && !this.state.filterThirdOption && !this.state.filterFourthOption);
    }

    render() {
        console.log(this.state);
        document.title = "Check your Orders !"

        var orders = null;
        var orderMenus = null;

        if (this.isFilterOff()) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            orders = this.state.orders;
            orderMenus = this.state.orderMenus;
        } else {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            let filteredIndices = [];
            orders = this.state.orders.filter((order, idx) => {
                if (this.getMeTrueFilter().indexOf(order.order_status) > -1) {
                    filteredIndices.push(idx);
                    return true
                }
            });
            console.log(filteredIndices);
            orderMenus = this.state.orderMenus.filter((_, idx) => {
                console.log(idx, _, filteredIndices.indexOf(idx));
                return filteredIndices.indexOf(idx) > -1;
            })
        }

        console.log(orders)
        console.log(orderMenus);

        return (
            <div>
                <Navbar {...this.props}></Navbar>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="order-filter-config">
                            <label>
                                <input type="checkbox" class="filter-square"
                                    checked={this.state.filterFirstOption}
                                    onChange={this.toggleFirstOption} />
                                <p class="filter-checkbox">Order Received</p>
                            </label>
                            <br></br>
                            <label>
                                <input type="checkbox" class="filter-square"
                                    checked={this.state.filterSecondOption}
                                    onChange={this.toggleSecondOption} />
                                <p class="filter-checkbox">Preparing</p>
                            </label>
                            <br></br>
                            <label>
                                <input type="checkbox" class="filter-square"
                                    checked={this.state.filterThirdOption}
                                    onChange={this.toggleThirdOption} />
                                <p class="filter-checkbox">On the Way / Pick Up Ready</p>
                            </label>
                            <br></br>
                            <label>
                                <input type="checkbox" class="filter-square"
                                    checked={this.state.filterFourthOption}
                                    onChange={this.toggleFourthOption} />
                                <p class="filter-checkbox">Delivered / Picked Up</p>
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="orders-container">
                            <h1 class="inline-h1">Your Orders !</h1>

                            <br></br>
                            <ul>
                                {orders.map((order, idx) => (
                                    <li class="each-order">
                                        <div class="inline-div">[{order.order_status}]</div>
                                        <div class="inline-div div-go-right">{order.order_date.split("T")[0]}</div>
                                        <br></br>
                                        <div>
                                            {order.res_name} {order.res_avg_rating} / 5.0
                                </div>
                                <div>Total of ${order.total_price}, <u>{this.determineDeliveryCode(order.food_provide_code)}</u>  [{order.order_status}]</div>
                                        {this.returnOrderMenus(orderMenus, idx)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
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
        renderToProfile: (payload) => dispatch({ type: actionTypes.RENDER_TO_PROFILE, payload: payload }),
        flushUser: () => dispatch({ type: actionTypes.FLUSH_USER })
    }
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(OrderForUsers);