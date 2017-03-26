import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ListView,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import Restaurant from './restaurant';
import Settings from './settings';

import { actionCreators } from './reducer';
import { connect } from 'react-redux';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            loading: true,
            dataSource: ds.cloneWithRows([])
        };
    }
    render() {
        const {navigator, dispatch} = this.props;

        if (this.props.redux !== undefined) {
            let mustFilter = this.props.redux.mustFilter;
            if (mustFilter) {

                this.getRestaurantsFromApiAsync(this.state.accessToken).then(data => {
                    this.setState({ dataSource: ds.cloneWithRows(data.businesses) });
                    mustFilter = false;
                });
            }
        }


        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator
                        animating={this.state.loading}
                        style={{ height: 80 }}
                        size="large" />
                </View>
            )

        }
        return (
            <View>
                <Text>This is home page</Text>
                <TouchableOpacity onPress={() => {
                    navigator.push({
                        component: Settings
                    });
                }} >
                    <Text>Filter</Text>
                </TouchableOpacity>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <Restaurant name={rowData.name} image_url={rowData.image_url} />
                        </View>
                    }
                />
            </View>
        )
    }
    componentDidMount() {
        this.fetchToken().then((data) => {
            this.setState({ accessToken: data.access_token });
            this.getRestaurantsFromApiAsync(data.access_token).then(restaurantData => {
                this.setState({ dataSource: ds.cloneWithRows(restaurantData.businesses) });
                this.setState({ loading: false });
            })
        })
    }
    async getAccessTokenFromStorage() {
        try {
            let accessTokenFromStorage = await AsyncStorage.getItem("access_token");
            this.setState({
                accessToken: accessTokenFromStorage
            });
        } catch (error) {
        }
    }
    async fetchToken() {
        const params = {
            client_id: 'tQyHUDn9ocxSt62kfaLS1w', // use your own
            client_secret: '863nET7GMULkWMRaqCsnwV5xLwsmMv6TsQEsMxT3uoUMvV6mg6sCGXEO3XyccPUr', // use your own
            grant_type: 'client_credentials'
        }

        const request = new Request('https://api.yelp.com/oauth2/token', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            }),
            body: `client_id=${params.client_id}&client_secret=${params.client_secret}&grant_type=${params.grant_type}`
        });

        return fetch(request)
            .then(response => {
                return response.json()
            })
            .then(json => {
                return json;
            })
            .catch((error) => {
                console.error(error);
                alert("Can not connect internet");
                return {};
            });
    }
    getRestaurantsFromApiAsync(token) {

        let checkedListName = (this.props.redux === undefined || this.props.redux.checkedListName === undefined)
            ? [] : this.props.redux.checkedListName;
        let categoryQuery = "&categories=" + checkedListName.toString();

        let url = 'https://api.yelp.com/v3/businesses/search?limit=3&term=delis&latitude=37.786882&longitude=-122.399972'
            + categoryQuery
            ;
        let request = new Request(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
            })
        });

        return fetch(request)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                alert("Can not connect internet");
                return [];
            });
    }



}


// End of your component
const mapStateToProps = (state) => {
    return {
        redux: state.searchReducer.params
    }
}
// Maping storage of Redux to props of your component
export default connect(mapStateToProps)(Home);