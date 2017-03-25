import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Scene1 from './Apps/Scene1';
import {Provider} from 'react-redux';
import reducers from './Apps/reducer.js';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import Login from './Apps/login';
const store = createStore(reducers , devToolsEnhancer());


const defaultRoute = {
  title: 'Scene1',
  component: Scene1
}


export default class Yelp extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator){
    return <route.component route={route} navigator={navigator} passProps={route.passProps} />
  }

  render() {
    return (
      /*<Provider store={store}>
        <Navigator
          initialRoute={defaultRoute}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}/>
      </Provider>*/
      <Login/>
    )
  };
}


AppRegistry.registerComponent('Yelp', () => Yelp);
