import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
    title: 'MyUTAR',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('Events')}}>
          <Image
          source={require('./images/event.png')}
          style={styles.img}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('Notifications')}}>
          <Image
          source={require('./images/notification.png')}
          style={styles.img}
          />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  img:{
    height: 180,
    width: 180,
    margin: 20,
  },
});
