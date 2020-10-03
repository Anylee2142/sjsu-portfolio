import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import UserProfile from './User/UserProfile';
import UserLogin from './User/UserLogin';
import UserSignup from './User/UserSignup';
import UserModify from './User/UserModify';
import RestaurantList from './Restaurant/RestaurantList';
import RestaurantDetail from './Restaurant/RestaurantDetail';
import RestaurantOrder from './Restaurant/RestaurantOrder';

import RestaurantLogin from './RestaurantUser/RestaurantLogin';
import RestaurantSignup from './RestaurantUser/RestaurantSignup';
import RestaurantProfile from './RestaurantUser/RestaurantProfile';
import RestaurantModify from './RestaurantUser/RestaurantModify';
import RestaurantAddMenu from './RestaurantUser/RestaurantAddMenu';
import RestaurantEditMenu from './RestaurantUser/RestaurantEditMenu';

import EventForUsers from './Events/EventForUsers'
import EventDetailsForUsers from './Events/EventDetailsForUsers';
import RegisteredEventForUsers from './Events/RegisteredEventForUsers';
import OrderForUsers from './Orders/OrderForUsers';
import OrderChangeForRestaurants from './Orders/OrderChangeForRestaurants';
import EventForRestaurants from './Events/EventForRestaurants';
import OrderForRestaurants from './Orders/OrderForRestaurants';

import RootRouter from './Root/RootRouter';
import NotFound_404 from './etc/NotFound_404';

//Create a Main Component
class Main extends Component {
    render() {
        console.log("Main props", this.props);
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Switch>
                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/userLogin" component={UserLogin} />
                    <Route path="/userSignup" component={UserSignup} />
                    <Route path="/userModify" component={UserModify} />
                    <Route path="/eventUsers" component={EventForUsers} />
                    <Route path="/eventDetailsUsers" component={EventDetailsForUsers} />
                    <Route path="/registeredEventUsers" component={RegisteredEventForUsers} />
                    <Route path="/orderUsers" component={OrderForUsers} />
                    <Route path="/restaurantList" component={RootRouter}/>
                    <Route path="/restaurantDetail" component={RestaurantDetail}/>
                    <Route path="/restaurantOrder" component={RestaurantOrder}/>
                    <Route path="/restaurantLogin" component={RestaurantLogin}/>
                    <Route path="/restaurantSignup" component={RestaurantSignup}/>
                    <Route path="/restaurantProfile" component={RestaurantProfile}/>
                    <Route path="/restaurantModify" component={RestaurantModify}/>
                    <Route path="/restaurantAddMenu" component={RestaurantAddMenu}/>
                    <Route path="/restaurantEditMenu" component={RestaurantEditMenu}/>
                    <Route path="/eventRestaurants" component={EventForRestaurants}/>
                    <Route path="/orderRestaurants" component={OrderForRestaurants}/>
                    <Route path="/orderChangeRestaurants" component={OrderChangeForRestaurants}/>
                    <Route path="/home" component={RestaurantList}/>
                    <Route exact path="/" component={RootRouter}/>  {/* If not `exact`, then all the other routes will be directed here */}
                    <Route component={NotFound_404}/>
                </Switch>
            </div>
        )
    }
}
//Export The Main Component
export default Main;