import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';

const notification = {
  1 : {
  image: {uri:('http://www.utar.edu.my/media/EVENTS/CEE133529.jpg')},
  title: 'Grammar Express: Common English Tenses',
  date: '1 June 2018 (Friday)',
  time: '9.00am - 5.00pm',
  venue: 'UTAR, Sungai Long Campus',
  fee: 'RM150.00 per participant (6% GST Inclusive)',
  link: 'https://goo.gl/9KgjqR',
  type:'Talk',
  },
  2 : {
  image: {uri:('http://www.utar.edu.my/media/EVENTS/CEE133517.jpg')},
  title: 'Workplace Safety and Health',
  date: '7 & 8 June 2018 (Thursday & Friday) ',
  time: '9.00am - 5.00pm',
  venue: 'UTAR, Sungai Long Campus',
  fee: 'RM470.00 per participant (6% GST Inclusive)',
  link: 'https://bit.ly/2HufXch',
  type: 'Career',
  },
  3 : {
  image: {uri:('http://www.utar.edu.my/media/EVENTS/CEE135062.jpg')},
  title: 'How to Kick Start M-Commerce using Smart Phone',
  date: '11 July 2018 (Wednesday)',
  time: '9.00am - 1.00pm',
  venue: 'UTAR, Sungai Long Campus',
  fee: 'RM93.00 per participant',
  link: 'https://bit.ly/2wPXmH1',
  type: 'Career',
  },
  4 : {
  image: {uri:('http://www.utar.edu.my/media/EVENTS/DARP135018.jpg')},
  title: 'Your Memory is Better Than You Think',
  date: '21 July 2018 (Saturday)',
  time: '9.30am - 12.30pm',
  venue: 'KB315, Sungai Long Campus',
  fee: 'Free',
  link: 'naresh@utar.edu.my',
  type: 'Talk',
  },
}

export default class NotificationDetails extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Notification Details',
    };
  }

  render() {
    let not = this.props.navigation.getParam('notification');

    return (
      <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>
          sdfs
        </Text>
        <Text style={styles.desc}>
          fasdfas
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
