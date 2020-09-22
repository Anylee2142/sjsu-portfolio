import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from './Header/Navbar';
import UserProfile from './User/UserProfile';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/user" component={UserProfile}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;