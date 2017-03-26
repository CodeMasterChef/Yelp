import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Scene1 from './Apps/Scene1';
import { Provider } from 'react-redux';
import reducers from './Apps/reducer.js';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import Login from './Apps/login';
import Home from './Apps/home';
import Settings from './Apps/settings';
import { actionCreators } from './Apps/reducer';
import { connect } from 'react-redux';

const store = createStore(reducers, devToolsEnhancer());


const defaultRoute = {
  title: 'Login',
  component: Home
}

class Yelp extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    return <route.component route={route} navigator={navigator} passProps={route.passProps} />
  }

  render() {
   
    return (
      <Provider store={store}>
        <Navigator style={{  }}
          initialRoute={defaultRoute}
          renderScene={(route, navigator) => this.renderScene(route, navigator)} />
      </Provider>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    redux: state.searchReducer.params
  }
}
export default connect(mapStateToProps)(Yelp);


AppRegistry.registerComponent('Yelp', () => Yelp);
