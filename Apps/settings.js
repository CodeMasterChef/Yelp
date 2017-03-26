import React, { Component } from 'react';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    ListView
} from 'react-native';

import SwitchView from './switchView';

import { actionCreators } from './reducer';
import { connect } from 'react-redux';

class Settings extends Component {
    constructor(props) {
        super(props);

        let categories = [
            { name: 'Afghan', alias: 'afghani' },
            { name: 'African', alias: 'african' },
            { name: 'American (New)', alias: 'newamerican' },
            { name: 'American (Traditional)', alias: 'tradamerican' }
        ]
        this.state = {
            dataSource: ds.cloneWithRows(categories)
        };
    }
    render() {
        const {navigator, dispatch} = this.props;
         let checkedListName = (this.props.redux === undefined) 
                            ? [] : this.props.redux.checkedListName;
        return (
            <View>
               
                <TouchableOpacity onPress={() => {
                    navigator.pop();
                }} >
                <Text>Cancel</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => {
                    navigator.pop();
                    dispatch(actionCreators.storeDataScene1({ mustFilter: true , checkedListName : checkedListName }) );
           
                }} >
                    <Text>Filter</Text>
                </TouchableOpacity>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <SwitchView content={rowData} value={false} />
                        </View>
                    }
                />

            </View>
        )
    }
}


// End of your component
const mapStateToProps = (state) => {
    return {
        redux: state.searchReducer.params
    }
}
// Maping storage of Redux to props of your component
export default connect(mapStateToProps)(Settings);