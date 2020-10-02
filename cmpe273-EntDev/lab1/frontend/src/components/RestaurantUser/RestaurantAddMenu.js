import React, { Component } from 'react';
import './RestaurantAddMenu.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Navbar from '../Header/Navbar';

//create the Navbar Component
class RestaurantAddMenu extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            ingredient: "",
            price: 0,
            menu_desc: "",
            appetizer: false,
            salads: false,
            main_dish: false,
            desserts: false,
            beverages: false
        }
        console.log("AddMenu for props = ", this.props);

        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.priceChangeHandler = this.priceChangeHandler.bind(this);
        this.ingredientChangeHandler = this.ingredientChangeHandler.bind(this);
        this.descChangeHandler = this.descChangeHandler.bind(this);

        this.toggleAppetizer = this.toggleAppetizer.bind(this);
        this.toggleSalads = this.toggleSalads.bind(this);
        this.toggleMainDish = this.toggleMainDish.bind(this);
        this.toggleDesserts = this.toggleDesserts.bind(this);
        this.toggleBeverages = this.toggleBeverages.bind(this);

        this.submitAddMenu = this.submitAddMenu.bind(this);
        this.convertToCategoryCode = this.convertToCategoryCode.bind(this);
    }

    convertToCategoryCode() {
        let theCode = -1;
        if (this.state.appetizer) theCode = 0;
        if (this.state.salads) theCode = 1;
        if (this.state.main_dish) theCode = 2;
        if (this.state.desserts) theCode = 3;
        if (this.state.beverages) theCode = 4;
        return theCode;
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    priceChangeHandler = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    ingredientChangeHandler = (e) => {
        this.setState({
            ingredient: e.target.value
        })
    }

    descChangeHandler = (e) => {
        this.setState({
            menu_desc: e.target.value
        })
    }

    componentWillMount() {
        this.setState({
            appetizer: false,
            salads: false,
            main_dish: false,
            desserts: false,
            beverages: false
        })
    }

    toggleAppetizer() {
        this.setState({
            appetizer: !this.state.appetizer,
            salads: false,
            main_dish: false,
            desserts: false,
            beverages: false
        })
    }

    toggleSalads() {
        this.setState({
            appetizer: false,
            salads: !this.state.salads,
            main_dish: false,
            desserts: false,
            beverages: false
        })
    }

    toggleMainDish() {
        this.setState({
            appetizer: false,
            salads: false,
            main_dish: !this.state.main_dish,
            desserts: false,
            beverages: false
        })
    }

    toggleDesserts() {
        this.setState({
            appetizer: false,
            salads: false,
            main_dish: false,
            desserts: !this.state.desserts,
            beverages: false
        })
    }

    toggleBeverages() {
        this.setState({
            appetizer: false,
            salads: false,
            main_dish: false,
            desserts: false,
            beverages: !this.state.beverages
        })
    }

    submitAddMenu = (e) => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            ingredient: this.state.ingredient,
            price: this.state.price,
            menu_desc: this.state.menu_desc,
            category: this.convertToCategoryCode(),
            res_pk: this.props.restaurantUser.res_pk
        };

        this.setState({
            name: "",
            ingredient: "",
            price: 0,
            menu_desc: "",
            appetizer: false,
            salads: false,
            main_dish: false,
            desserts: false,
            beverages: false
        });

        axios.defaults.withCredentials = true;
        axios.post("http://localhost:3001/menus", data)
            .then(response => {
                console.log("Retunred message = ", response.data);
                if (response.status === 200) {
                    this.props.history.push("/restaurantProfile");
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
                    this.props.history.push("/restaurantProfile");
                }
            });
    }

    render() {
        console.log(this.state);
        document.title = " [ Add Menu ] "

        return (
            <div>
                <Navbar {...this.props}></Navbar>
                <div class="addmenu-container">
                    <h1 class="go-center">Add Menu !</h1>
                    <hr></hr>
                    <h2 class="go-center">Menu name</h2>
                    <div class="form-group">
                        <input onChange={this.nameChangeHandler} type="text" name="name" placeholder="Menu name" value={this.state.name} required />
                    </div>

                    <h2 class="go-center">Price</h2>
                    <div class="form-group">
                        <input onChange={this.priceChangeHandler} type="number" min="1" name="price" placeholder="How much dollar?" value={this.state.price} required />
                    </div>

                    <h2 class="go-center">Ingredient</h2>
                    <div class="form-group">
                        <input onChange={this.ingredientChangeHandler} type="text" name="ingredient" placeholder="Brief explanation" value={this.state.ingredient} required />
                    </div>

                    <h2 class="go-center">Brief Description</h2>
                    <div class="form-group">
                        <input onChange={this.descChangeHandler} type="text" name="menu_desc" placeholder="Brief explanation" value={this.state.menu_desc} required />
                    </div>
                    <div class="row">
                        <h2 class="go-center">Category</h2>
                        <div>
                            <input onChange={this.toggleAppetizer} type="radio" id="appetizer" name="category" value={this.state.appetizer}></input>
                            <label for="appetizer">Appetizer</label>
                        </div>
                        <div>
                            <input onChange={this.toggleSalads} type="radio" id="salads" name="category" value={this.state.salads}></input>
                            <label for="salads">Salads</label>
                        </div>
                        <div>
                            <input onChange={this.toggleMainDish} type="radio" id="main_dish" name="category" value={this.state.main_dish}></input>
                            <label for="main_dish">Main Dish</label>
                        </div>
                        <div>
                            <input onChange={this.toggleDesserts} type="radio" id="desserts" name="category" value={this.state.desserts}></input>
                            <label for="desserts">Desserts</label>
                        </div>
                        <div>
                            <input onChange={this.toggleBeverages} type="radio" id="beverages" name="category" value={this.state.beverages}></input>
                            <label for="beverages">Beverages</label>
                        </div>


                    </div>

                </div>
                <div class="btn-container">
                    <button onClick={this.submitAddMenu} class="btn btn-primary modify-btn">Submit !</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantAddMenu);
