import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

export default class StationText extends React.Component {
    handleClick = (e) => {
        Alert.alert('You are at ' + this.props.stationName);
    }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.handleClick}>
            <Text style={styles.text}>{this.props.stationName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    height: 20,
    flex: 1,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button: {
  },
  text: {
      fontSize: 30,
      color: 'white',
  }
});
