
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {LoginManager, GraphRequestManager, GraphRequest} from 'react-native-fbsdk';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  onConnectFacebook() {
    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          //alert('Login success with permissions: '
          //  +result.grantedPermissions.toString());
          this.getGraph();
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
      this._responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + JSON.stringify(result.toString()))
    }
  }

  render() {
    return (<View
      style={{
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
      }}
      >
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          width: 200, height: 40,
          alignItems: 'center', justifyContent: 'center',
        }}
        onPress={this.onConnectFacebook.bind(this)}
        >
        <Text
          style={{
            color: '#fff',
          }}
          >
          Connect with Facebook
        </Text>
      </TouchableOpacity>

    </View>);
  }
}