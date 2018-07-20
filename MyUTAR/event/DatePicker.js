import React, { Component } from 'react';
import {
    Picker,
    View,
    StyleSheet
} from 'react-native';

class DatePicker extends Component {
  constructor(props) {
      super(props);

      this.state = {
          year: '',
          month: '',
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          mode={'dropdown'}                     // 'dialog' is default, try 'dropdown'
          selectedValue={this.state.year}
          onValueChange={
              (itemValue, itemIndex) => this.setState({year: itemValue})
          }>
          <Picker.Item label="2017" value="2017" />
          <Picker.Item label="2018" value="2018" />
          <Picker.Item label="2019" value="2019" />
        </Picker>
        <Picker
          style={styles.picker}
          mode={'dropdown'}                     // 'dialog' is default, try 'dropdown'
          selectedValue={this.state.month}
          onValueChange={
              (itemValue, itemIndex) => this.setState({year: itemValue})
          }>
          <Picker.Item label="Jan" value="1" />
          <Picker.Item label="Feb" value="2" />
          <Picker.Item label="Mar" value="3" />
          <Picker.Item label="Apr" value="4" />
          <Picker.Item label="May" value="5" />
          <Picker.Item label="Jun" value="6" />
          <Picker.Item label="Jul" value="7" />
          <Picker.Item label="Aug" value="8" />
          <Picker.Item label="Sep" value="9" />
          <Picker.Item label="Oct" value="10" />
          <Picker.Item label="Nov" value="11" />
          <Picker.Item label="Dec" value="12" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   picker: {
      color: 'maroon',
      margin: 5,
      height: 30,
      width: 90,
      color: 'black',
   },
   container: {
     margin: 5,
     flexDirection: 'row'
   },
})

module.exports = {
  DatePicker: DatePicker
}
