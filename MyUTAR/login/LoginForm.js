import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class LoginForm extends Component<Props>{
  static navigationOptions = { title: 'Login'};
  render() {
    return (
    <View style={styles.container}>
    <TextInput
      placeholder='Enter your UTAR Mail....'
      placeholderTextColor='rgba(0,0,0,0.3)'
      keyboardType='email-address'
      autoCaptalize= 'none'
      autoCorrect= {false}
      enablesReturnKeyAutomatically={true}
      returnKeyType= 'next'
      style={styles.input}
    />
    <TextInput
      placeholder='Enter your password...'
      placeholderTextColor='rgba(0,0,0,0.3)'
      secureTextEntry= {true}
      autoCaptalize= 'none'
      autoCorrect= {false}
      enablesReturnKeyAutomatically= {true}
      returnKeyType= 'go'
      style={styles.input}
    />
    <TouchableOpacity style={styles.button} onPress={() => {navigate('Home')}}>
      <Text style={styles.login}>LOGIN</Text>
    </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 40
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(220,220,220,0.3)',
    marginBottom: 40,
    color: 'black',
    paddingHorizontal: 10
  },
  button: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,72,0.9)',
    marginBottom: 20
  },
  login: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});
