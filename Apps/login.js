
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  ActivityIndicator
} from 'react-native';
import { LoginManager, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import Home from './home';

import { actionCreators } from './reducer';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.loading = false;
    this.state = {
      loading: false
    }
  }

  onConnectFacebook() {
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        //alert('Login success with permissions: '
        //  +result.grantedPermissions.toString());
        this.getGraph();
        this.setState({ loading: true });
      }
    },
      (error) => {
        alert('Login fail with error: ' + error);
      }
    );
  }

  getGraph() {
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me',
      null,
      this._responseInfoCallback.bind(this),
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _responseInfoCallback(error: ? Object, result: ? Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      const {navigator, dispatch} = this.props;

      navigator.replace({
        component: Home
      });

    }
  }

  render() {

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <ActivityIndicator
          animating={this.state.loading}
          style={{ height: 80 }}
          size="large" />

        {
          (!this.state.loading) && (
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                width: 200, height: 40,
                alignItems: 'center', justifyContent: 'center',
              }}
              onPress={this.onConnectFacebook.bind(this)}
            >
              <Text style={{color: '#fff'}}>
                Connect with Facebook
        </Text>
            </TouchableOpacity>
          )

        }
      </View>);
  }
}
// End of your component
const mapStateToProps = (state) => {
  return {
    redux: state.searchReducer.params
  }
}

// Maping storage of Redux to props of your component
export default connect(mapStateToProps)(Login);