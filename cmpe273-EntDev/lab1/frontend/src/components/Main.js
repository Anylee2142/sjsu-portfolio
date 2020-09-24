import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from './Header/Navbar';
import UserProfile from './User/UserProfile';
import UserLogin from './User/UserLogin';
import UserSignup from './User/UserSignup';
import UserModify from './User/UserModify';

import RestaurantList from './Restaurant/RestaurantList';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/userProfile" component={UserProfile}/>
                <Route path="/userLogin" component={UserLogin}/>
                <Route path="/userSignup" component={UserSignup}/>
                <Route path="/userModify" component={UserModify}/>
                <Route path="/restaurantList" component={RestaurantList}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;