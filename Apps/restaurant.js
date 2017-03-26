import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
    
} from 'react-native';
 import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';

export default class Restaurant extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Image style={{width: 50 , height : 50 }}
                    indicator={Progress}
                    source = {{uri : this.props.image_url}}
                />
               

            </View>
        )
    }
}