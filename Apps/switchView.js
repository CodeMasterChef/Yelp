import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    ListView
} from 'react-native';

import { actionCreators } from './reducer';
import { connect } from 'react-redux';

class SwitchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.value
        }
    }
    render() {
        const {navigator, dispatch} = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'row' , margin: 5 }}>
                <Text style={{ flex: 1, marginLeft: 10 }} >{this.props.content.name}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                    <Switch
                        onValueChange={(value) => {
                            this.setState({ checked: value });
                            let checkedListName = (this.props.redux === undefined || this.props.redux.checkedListName === undefined  ) 
                            ? [] : this.props.redux.checkedListName;
                            if (value) {
                                checkedListName.push(this.props.content.alias);
                            } else {
                                checkedListName = checkedListName.filter ( alias => alias !== this.props.content.alias ) ;
                            }
                         
                         
                            dispatch(actionCreators.storeDataScene1({ checkedListName: checkedListName })); //
                        }
                        }
                        value={this.state.checked} />
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
export default connect(mapStateToProps)(SwitchView);