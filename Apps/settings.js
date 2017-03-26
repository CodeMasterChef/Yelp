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

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#C31112', paddingTop: 20, flex: 1, height: 70, maxHeight: 70, flexDirection: 'row'
    },
})
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
            < View style={{ flex: 1 }}>
                <View style={[styles.header, { flex: 1, flexDirection: 'row', padding: 10,  paddingTop: 30 }]} >
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <TouchableOpacity onPress={() => {
                            navigator.pop();
                        }} >
                            <Text style={{ color: 'white' }} >Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }} >
                        <Text style={{ color: 'white' }} >Filter</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                        <TouchableOpacity onPress={() => {
                            navigator.pop();
                            dispatch(actionCreators.storeDataScene1({ mustFilter: true, checkedListName: checkedListName }));
                        }} >
                            <Text style={{ color: 'white' }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style= {{ margin : 10 } }>
                    <Text style={{ fontWeight: 'bold' , fontSize : 16}}>Catergory</Text>
                    <ListView style={{ marginTop: 10 }}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <View>
                                <SwitchView content={rowData} value={false} />
                            </View>
                        }
                    />
                </View>

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