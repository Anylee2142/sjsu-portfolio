import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import Navbar from './Header/Navbar';
import UserProfile from './User/UserProfile';
import UserLogin from './User/UserLogin';
import UserSignup from './User/UserSignup';
import UserModify from './User/UserModify';
import RestaurantList from './Restaurant/RestaurantList';
import RestaurantDetail from './Restaurant/RestaurantDetail';
import RestaurantOrder from './Restaurant/RestaurantOrder';
import EventForUsers from './Events/EventForUsers'
import EventDetailsForUsers from './Events/EventDetailsForUsers';
import RegisteredEventForUsers from './Events/RegisteredEventForUsers';
import OrderForUsers from './Orders/OrderForUsers';
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