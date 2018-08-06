import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    StyleSheet,
    Picker
} from 'react-native';

class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.orientation = this.props.orientation ? (this.props.orientation == 'horizontal' ? 'row' : 'column') : 'column';
    }

    render() {
        return (
            <View style={[inputStyles.container, {flexDirection: this.orientation}]}>
                <TextInput style={[inputStyles.input, this.props.style]}
                    autoFocus={this.props.autoFocus ? this.props.autoFocus : false}
                    placeholder={this.props.placeholder ? this.props.placeholder : ''}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    onSubmitEditing={this.props.onSubmitEditing}
                    multiline={this.props.multiline ? this.props.multiline : false}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
                />
            </View>
        )
    }
}

class PickerWithLabel extends Component {
    constructor(props) {
        super(props);

        this.orientation = this.props.orientation ? (this.props.orientation == 'horizontal' ? 'row' : 'column') : 'column';
    }

    render() {
        return (
            <View style={{flexDirection: this.orientation}}>
              <Picker
                style={this.props.style}
                mode={this.props.mode ? this.props.mode : 'dropdown'}
                prompt={this.props.prompt ? this.props.prompt : ''}
                selectedValue={this.props.value}
                onValueChange={this.props.onValueChange}
                textStyle={this.props.textStyle ? this.props.textStyle : {fontSize: 18}}
              >
                {this.props.items.map((item, index) => {
                  return(<Picker.Item label={item.dId} value={item.dId} key={item.dId} />)
                })}
              </Picker>
            </View>
        )
    }
}

const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    label: {
        flex: 1,
        marginLeft: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlignVertical: 'center',
    },
    input: {
        flex: 3,
        fontSize: 20,
    }
});

class AppButton extends Component {
    constructor(props) {
        super(props);

        if(props.theme) {
            switch(props.theme) {
                case 'success':
                    this.backgroundColor = '#449d44';
                    break;
                case 'info':
                    this.backgroundColor = '#31b0d5';
                    break;
                case 'warning':
                    this.backgroundColor = '#ec971f';
                    break;
                case 'danger':
                    this.backgroundColor = '#c9302c';
                    break;
                case 'primary':
                default:
                    this.backgroundColor = '#286090';
            }
        }
        else {
            this.backgroundColor = '#286090';
        }
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                <View style={[buttonStyles.button, this.props.style, {backgroundColor: this.backgroundColor}]}>
                    <Text style={buttonStyles.buttonText}>{this.props.title}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const buttonStyles = StyleSheet.create({
    button: {
        margin: 5,
        alignItems: 'center',
    },
    buttonText: {
        padding: 20,
        fontSize: 20,
        color: 'white'
    },
});

/**
 * Export modules
 */
module.exports = {
    SearchInput: SearchInput,
    PickerWithLabel: PickerWithLabel,
    AppButton: AppButton
}
