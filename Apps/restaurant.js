import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View

} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Restaurant extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let address = this.props.display_address.toString();
        console.log(address);
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View  style={{ flex: 1 , margin: 15 }} >
                 <Image style={{ width: 100 , height: 100 }}
                    indicator={Progress}
                    source={{ uri: this.props.image_url }}
                />
                </View>
               
                <View style={{ flex: 2, margin: 10 }} >
                    <View flexDirection='row' >
                        <Text style={{ flex: 2 }}>{this.props.name}</Text>
                        <Text style={{ flex: 1, alignItems: 'flex-end' }}>{Math.round(this.props.distance)} mi</Text>
                    </View>
                    <View flexDirection='row'>
                        <Icon
                            name='ios-star'
                            size={18}
                            style={ {color : '#F08C52' }}
                        />
                        <Text style={{marginRight : 10 }}>{this.props.rating}</Text>
                        <Text style={{marginRight :2 }} >{this.props.review_count}</Text>
                        <Text>Reviews</Text>
                    </View>
                    <View>
                        <Text>{address}</Text>
                    </View>



                </View>




            </View>
        )
    }
}