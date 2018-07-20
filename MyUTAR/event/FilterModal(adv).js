import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
} from 'react-native';

class FilterModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      department: false,
      type: false,
      value: ''
    }
  }



  render(){
    return(
      <Modal
        visible={this.props.visible ? this.props.visible : false}
        animationType={this.props.animationType ? this.props.animationType : ''}
        transparent={this.props.transparent ? this.props.transparent : true}
        onRequestClose={}
      >
      <Text style={modStyles.title}>
        {this.props.title ? this.props.title : ''}
      </Text>
      <View style={modStyles.container}>
        <TouchableHighlight
        underlayColor={this.props.underlayColor ? this.props.underlayColor : ''}
        style={modStyles.button}
        onPress={() => this.filter()}>
          <Text style={modStyles.text}>
            {this.props.dep ? this.props.dep : ''}
          </Text>
        </TouchableHighlight>
      </View>
      </Modal>
    )
  }
}

const modStyles = StyleSheet.create({
  title: {

  },
  container: {

  },
  button:{

  },
  text:{

  }
})
