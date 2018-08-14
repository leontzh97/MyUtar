import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class LoginScreen extends Component<Props>{
  static navigationOptions = {
    title: 'Login',
  };

  constructor(){
    super();

    this.state = {
      id: '',
      password: ''
    }
  }

  render() {
    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.logo_Container}>
        <Image
        style={styles.logo}
        source={require('./UTAR.png')}
        />
        <Text style={styles.content}>
          Welcome to UTAR Mail
        </Text>
      </View>
      <View style={styles.formContainer}>
      <TextInput
        placeholder='Enter your UTAR ID....'
        placeholderTextColor='rgba(0,0,0,0.3)'
        keyboardType='numeric'
        autoCaptalize= 'none'
        autoCorrect= {false}
        onValueChange= {(value) => this.setState({id: value})}
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
        onValueChange= {(value) => this.setState({password: value})}
        enablesReturnKeyAutomatically= {true}
        returnKeyType= 'go'
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Home')}}>
        <Text style={styles.login}>LOGIN</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo_Container:{
    alignItems:'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo:{
    height: 150,
    width: 150
  },
  content:{
    color: 'grey',
    fontSize: 18,
    textAlign: 'center'
  },
  formContainer: {
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
