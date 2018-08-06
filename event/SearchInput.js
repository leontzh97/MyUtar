import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';

/**
 * InputWithLabel
 */
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

/**
 * Export modules
 */
module.exports = {
    SearchInput: SearchInput
}
