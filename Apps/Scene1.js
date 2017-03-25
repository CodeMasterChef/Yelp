import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import { actionCreators } from './reducer';
import { connect } from 'react-redux';
import Scene2 from './Scene2';
class Scene1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataProps: 'this is from prop',
            dataRedux: 'this is from redux'
        }
    }

    render() {
        const {navigator, dispatch} = this.props;
        return (
        <TouchableOpacity
            onPress={() => {
                dispatch(actionCreators.storeDataScene1({ dataReduxFromScene1: this.state.dataRedux })); //
                navigator.push({
                    title: 'Scene2',
                    component: Scene2,
                    passProps: { dataPropsFromScene1: this.state.dataProps }
                });
            }}
        >
            <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 40, padding: 5, borderWidth: 1, borderColor: 'red' }}>Go to Scene 2</Text>
        </TouchableOpacity>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        hehehe: state.searchReducer.params
    }
}

// End of your component
// Connect this component to Redux
export default connect()(Scene1);

