import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import { GoogleApiWrapper } from 'google-maps-react';
import * as actionTypes from './store/actions';
import { connect } from 'react-redux';

//App Component
class App extends Component {

  componentWillMount() {
    this.props.renderToGoogle(this.props.google);
  }

  render() {
    console.log("App props ", this.props);
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main google={this.props.google}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      google: state.google
  }
};

const mapDispatchToProps = dispatch => {
  return {
      renderToGoogle: (payload) => dispatch({ type: actionTypes.RENDER_TO_GOOGLE, payload: payload }),
      flushGoogle: () => dispatch({ type: actionTypes.FLUSH_GOOGLE }),
  }
};

// export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);

export default connect(mapStateToProps, mapDispatchToProps)( GoogleApiWrapper({
  apiKey: "AIzaSyC4yz_VXPDqonzJZ7q3TTDsgiLmKxk8wgY"
 })(App));

// //Export the App component so that it can be used in index.js
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyC4yz_VXPDqonzJZ7q3TTDsgiLmKxk8wgY"
//  })(App);