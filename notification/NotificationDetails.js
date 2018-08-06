import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class NotificationDetails extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Notification Details',
    };
  }

  render() {
    let title = this.props.navigation.getParam('dataTitle');
    let desc = this.props.navigation.getParam('dataDesc');

    return (
      <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.desc}>
          {desc}
        </Text>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    color: 'black'
  },
  image: {
      width: 360,
      height: 530,
  },
  desc: {
    fontSize: 18,
    textAlign: 'left',
    margin: 10,
    color: 'grey'
  },
  scroll:{
    height: 280,
  }
});
