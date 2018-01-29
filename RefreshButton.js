import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

export default class RefreshButton extends React.Component {
    handlePress = () => {
        Alert.alert('Refreshed!');
        this.props.onPress();
    }

    render() {
        return (
            <Button style={styles.button} onPress={this.handlePress} title="Refresh" />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
});
