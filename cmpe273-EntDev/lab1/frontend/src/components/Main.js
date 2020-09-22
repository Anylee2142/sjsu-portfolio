import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from './Header/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;