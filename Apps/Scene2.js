import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

class Scene2 extends Component {
  render() {
    return (
      <View style={{marginTop:50}}>
        <View>
          <Text>Case 1: Get data via props</Text>
          <Text style={{ fontWeight: 'bold' }}>{this.props.passProps.dataPropsFromScene1}</Text>
        </View>

        <View >
          <Text>Case 2: Get data via Redux</Text>

          <Text style={{fontWeight:'bold'}}>{this.props.hahaha.dataReduxFromScene1}</Text>
        </View>


      </View>


    );
  }
}

// End of your component
const mapStateToProps = (state) =>{
  return{
    hahaha : state.searchReducer.params
  }
}
// Maping storage of Redux to props of your component
export default connect(mapStateToProps)(Scene2);