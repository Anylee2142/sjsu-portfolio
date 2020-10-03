import React, { Component } from 'react';
import './OrderForUsers.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class OrderForRestaurants extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            originalOrders: {},
            originalOrderMenus: {},
            users: {},
            orders: [],
            orderMenus: {},
            errorMessage: "",
            filterFirstOption: false,
            filterSecondOption: false,
            filterThirdOption: false,
            filterFirstKeyword: ["Order Received"],
            filterSecondKeyword: ["Delivered", "Picked Up"],
            filterThirdKeyword: ["Cancelled Order"],
            render: false
        }
        console.log("Orders for props = ", this.props);

        this.determineDeliveryCode = this.determineDeliveryCode.bind(this);
        this.returnOrderMenus = this.returnOrderMenus.bind(this);
        this.toggleFirstOption = this.toggleFirstOption.bind(this);
        this.toggleSecondOption = this.toggleSecondOption.bind(this);
        this.toggleThirdOption = this.toggleThirdOption.bind(this);
        this.isFilterOff = this.isFilterOff.bind(this);
        this.getMeTrueFilter = this.getMeFilterKeyword.bind(this);
        this.organizeData = this.organizeData.bind(this);
    }

    componentWillMount() {
        this.setState({
            filterFirstOption: false,
            filterSecondOption: false,
            filterThirdOption: false,
        })
    }

    organizeData(orders, orderMenus, filterKeywordArray) {
        // All the unique user_pk
        let userPk = {};
        console.log(orders, orderMenus, filterKeywordArray);
        orders.forEach((order) => {
            userPk[order.user_pk] = order;
        });
        console.log(userPk);

        // Extract Orders by user;
        let OrdersByUser = {}; // { user_pk: his_orders }
        Object.keys(userPk).forEach((user_pk) => {
            OrdersByUser[user_pk] = orders.filter(order => {
                // If 0, No filter set
                let ifFilter = (filterKeywordArray.length === 0) ? true : filterKeywordArray.indexOf(order.order_status) > -1;
                return order.user_pk == user_pk && ifFilter;
            });
        });
        console.log(OrdersByUser);

        // Extract orderMenus by order;
        let OrderMenusByOrder = {}; // { order_pk : its_menus }
        if (Object.keys(OrdersByUser).length > 0) {
            orders.forEach((order) => {
                OrderMenusByOrder[order.order_pk] = orderMenus.filter(orderMenu => orderMenu.order_pk === order.order_pk);
            });
        }
        console.log(OrderMenusByOrder);

        return [userPk, OrdersByUser, OrderMenusByOrder];
    }

    componentDidMount() {
        // Connect DB to fetch events

        // Put a little bit of delay so that it won't always display "no display" at the first blink

        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/orders/restaurants/${this.props.restaurantUser.res_pk}`)
            .then(response => {
                console.log("Fetched Orderse = ", response.data);
                let orders = response.data;
                console.log("Chaning Local State Finished !");
                axios.get(`http://localhost:3001/orderMenus/restaurants/${this.props.restaurantUser.res_pk}`)
                    .then(response => {
                        console.log("Fetched Order Menus = ", response.data);
                        let orderMenus = response.data;
                        let organized = this.organizeData(orders, orderMenus, []);
                        this.setState({
                            originalOrders: orders,
                            originalOrderMenus: orderMenus,
                            users: organized[0],
                            orders: organized[1],
                            orderMenus: organized[2]
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        // console.log("Error has been catched : ", error.response.status);
                        // console.log(error.response);
                        // console.log("Error response data = ", error.response.data);
                        // if (true) {
                        //     this.setState({
                        //         errorMessage: error.response.data
                        //     })
                        // }
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

        setTimeout(function () {
            this.setState({
                render: true,
            })
        }.bind(this), 200)
    }

    toggleFirstOption() {
        this.setState({
            filterFirstOption: !this.state.filterFirstOption,
            filterSecondOption: false,
            filterThirdOption: false,
        })
    }

    toggleSecondOption() {
        this.setState({
            filterFirstOption: false,
            filterSecondOption: !this.state.filterSecondOption,
            filterThirdOption: false,
        })
    }

    toggleThirdOption() {
        this.setState({
            filterFirstOption: false,
            filterSecondOption: false,
            filterThirdOption: !this.state.filterThirdOption,
        })
    }

    determineDeliveryCode(foodProvideCode) {
        let deliveryMode = "Not determined ! Contact Admin ASAP";
        if (foodProvideCode == 0) { deliveryMode = "Dine-in"; }
        else if (foodProvideCode == 1) { deliveryMode = "Pickup"; }
        else if (foodProvideCode == 2) { deliveryMode = "Delivery"; }
        return deliveryMode;
    }

    getMeFilterKeyword() {
        if (this.state.filterFirstOption) { return this.state.filterFirstKeyword; }
        else if (this.state.filterSecondOption) { return this.state.filterSecondKeyword; }
        else if (this.state.filterThirdOption) { return this.state.filterThirdKeyword; }
        else { return []; } // When no filter set
    }

    returnOrderMenus(order_pk) {
        if (Object.keys(this.state.orderMenus).length > 0) {
            const orderMenu = this.state.orderMenus[order_pk];
            console.log(orderMenu);
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

        var usersVar = this.state.users;
        var ordersVar = this.state.orders;
        var orderMenusVar = this.state.orderMenus;

        if (this.state.render) {
            [usersVar, ordersVar, orderMenusVar] = this.organizeData(
                this.state.originalOrders,
                this.state.originalOrderMenus,
                this.getMeFilterKeyword());
        }

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
                                <p class="filter-checkbox">New Order</p>
                            </label>
                            <br></br>
                            <label>
                                <input type="checkbox" class="filter-square"
                                    checked={this.state.filterSecondOption}
                                    onChange={this.toggleSecondOption} />
                                <p class="filter-checkbox">Deliverd Order</p>
                            </label>
                            <br></br>
                            <label>
                                <input type="checkbox" class="filter-square"
                                    checked={this.state.filterThirdOption}
                                    onChange={this.toggleThirdOption} />
                                <p class="filter-checkbox">Cancelled Order</p>
                            </label>
                            <br></br>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="orders-container">
                            <h1 class="inline-h1">Your Orders ! (Click Order Status to Change)</h1>
                            <hr></hr>
                            <div>
                                {Object.keys(usersVar).map((user_pk) => (
                                    <div class="each-order">
                                        <h1><Link to={
                                            {
                                                pathname: "/userProfile",
                                                state: { user: usersVar[user_pk] }
                                            }}>{usersVar[user_pk].name}</Link></h1>
                                        {ordersVar[user_pk].map((order) => (
                                            <div class="each-order">
                                                <div class="inline-div">[{order.order_status}]</div>
                                                <div class="inline-div div-go-right">{order.order_date.split("T")[0]}</div>
                                                <br></br>
                                                <div>
                                                    {order.res_name} {order.res_avg_rating} / 5.0
                                </div>
                                                <div>
                                                    Total of ${order.total_price}, <u>{this.determineDeliveryCode(order.food_provide_code)}</u>  <Link to={
                                                        {
                                                            pathname: "/orderChangeRestaurants",
                                                            state: { order: order }
                                                        }
                                                    }>[{order.order_status}]</Link></div>
                                                {this.returnOrderMenus(order.order_pk)}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderForRestaurants);
