import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

export default class RefreshButton extends React.Component {
    handleClick = (e) => {
        Alert.alert('Refreshed');
    }
  render() {
    return (
        <Button style={styles.button} onPress={this.handleClick} title="Refresh" />
    );
  }
}

const styles = StyleSheet.create({
  button: {
      flex: 1,
  },
});
