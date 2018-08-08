import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Alert
} from 'react-native';

Date.prototype.formatted = function() {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  return `${date} ${monthsText[month]} ${year}(${daysText[day]})`;
}

export default class EventDetails extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Event Details',
    };
  }

  render() {
    let title = this.props.navigation.getParam('dataTitle');
    let venue = this.props.navigation.getParam('dataVenue');
    let fee = this.props.navigation.getParam('dataFee');
    let image = this.props.navigation.getParam('dataImage');
    let date = new Date(`${this.props.navigation.getParam('dataDate')}`);
    let time = this.props.navigation.getParam('dataTime');

    return (
      <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.desc}>
          Date: {date.formatted()}{'\n'}
          Time: {time}{'\n'}
          Venue: {venue}{'\n'}
          Admission Fee: {fee}{'\n'}
        </Text>
        <Image style={styles.image}
          source={{uri:(image)}}
        />

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
