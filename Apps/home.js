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
    ActivityIndicator,
    TextInput
} from 'react-native';

import Restaurant from './restaurant';
import Settings from './settings';

import { actionCreators } from './reducer';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    header : { 
        backgroundColor: '#C31112',  paddingTop: 20  , flex: 1, height: 70, maxHeight: 70, flexDirection: 'row'
    },
    filterButton: {
        margin: 10, borderColor: 'white', borderWidth: 1, borderRadius: 5
    },
    restaurantTextInput: {
        borderWidth: 1, 
        color: 'black', 
        borderColor: 'white', 
        backgroundColor : 'white',
        margin: 10, 
        paddingLeft: 20, 
        borderRadius: 10
    } , 
    listItem : { 
        borderBottomWidth : 1,
        borderBottomColor: 'gray',
       
    }
})
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantList: [],
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
            <View style= {{flex: 1 }} >
                <View style={ styles.header } >
                    <TouchableOpacity style={[{ flex: 1 }, styles.filterButton]} onPress={() => {
                        navigator.push({
                            component: Settings
                        });
                    }} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 30 }}>
                            <Text style={{ color: 'white' }} >Filter</Text>
                        </View>

                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                        < TextInput style={[ { flex: 1 } , styles.restaurantTextInput  ] } 
                         placeholder='restaurant'   placeholderTextColor="gray"   onChangeText={(text) => this.filterRestaurants({ text })} />
                    </View>
                </View>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <View style = { styles.listItem } >
                                <Restaurant name={rowData.name} image_url={rowData.image_url} rating={rowData.rating}
                                    review_count={rowData.review_count} distance={rowData.distance}
                                     review_count={rowData.review_count}
                                     display_address = { rowData.location.display_address}
                                />
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
                            this.setState({ restaurantList : restaurantData.businesses , dataSource: ds.cloneWithRows(restaurantData.businesses) });
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
     fetchToken() {
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

        let url = 'https://api.yelp.com/v3/businesses/search?limit=5&term=delis&latitude=37.786882&longitude=-122.399972'
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

      filterRestaurants(name) {
        let keyword = name.text.toLowerCase();
        let filteredList = [];
        for (let i = 0; i < this.state.restaurantList.length; i++) {
            let restaurant = this.state.restaurantList[i];
            let restaurantName = restaurant.name.toLowerCase();
            if (restaurantName.search(keyword) !== -1) {
                filteredList.push(restaurant);
            }
        }
        this.setState({ dataSource: ds.cloneWithRows(filteredList) });

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