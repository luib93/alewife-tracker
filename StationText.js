import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

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
  },
});

export default class StationText extends React.Component {
  handleClick = () => {
    Alert.alert(`You are at ${this.props.stationName}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.text}>{this.props.stationName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

StationText.propTypes = {
  stationName: PropTypes.string,
  onPress: PropTypes.func,
};
