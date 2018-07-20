import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  DatePickerAndroid,
  TouchableWithoutFeedback,
} from 'react-native';

Date.prototype.formatted = function() {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
}

class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      date: new Date(),
      dateText: '',
    }
  }

  openDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.date,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2099, 11, 31),
        mode: 'spinner', // try also with `spinner`
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        let selectedDate = new Date(year, month, day);

        this.setState({
          date: selectedDate,
          dateText: selectedDate.formatted(),
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={ this.openDatePicker }
        >
          <View>
            <TextInput
              style={styles.input}
              value={this.state.dateText}
              placeholder='Select Date to Sort'
              editable={false}
              underlineColorAndroid={'transparent'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  input: {
    fontSize: 16,
    height: 38,
    width: 280,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
});

module.exports = {
    DatePicker: DatePicker
}
